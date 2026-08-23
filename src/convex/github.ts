"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

const API = "https://api.github.com";

type PutResult = { path: string; status: "created" | "updated" | "unchanged" };

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
    // GitHub API requires a User-Agent
    "User-Agent": "mascardo-legacy",
  };
}

export const _diagnose = action({
  args: { owner: v.string(), repo: v.string() },
  handler: async (_ctx, args): Promise<Record<string, unknown>> => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return { error: "GITHUB_TOKEN not set" };
    const h = headers(token);
    const me = await fetch(`${API}/user`, { headers: h });
    const login = me.ok ? ((await me.json()) as { login?: string }).login : `HTTP ${me.status}`;
    const repo = await fetch(`${API}/repos/${args.owner}/${args.repo}`, { headers: h });
    const repoInfo = repo.ok ? ((await repo.json()) as { default_branch?: string }).default_branch : `HTTP ${repo.status}`;
    const list = await fetch(`${API}/user/repos?per_page=30&sort=updated`, { headers: h });
    const repos = list.ok ? ((await list.json()) as Array<{ full_name?: string }>).map((r) => r.full_name) : [];
    return { login, repoInfo, repos };
  },
});

/**
 * Pushes one or more text files to a GitHub repository via the Contents API.
 * Creates the file if it does not exist, updates it (with correct blob SHA)
 * if it does. Requires the GITHUB_TOKEN environment variable (a fine-grained
 * or classic personal access token with Contents: Read and write on the repo).
 */
export const pushFiles = action({
  args: {
    owner: v.string(),
    repo: v.string(),
    branch: v.optional(v.string()),
    commitMessage: v.string(),
    files: v.array(
      v.object({
        path: v.string(),
        content: v.string(),
      }),
    ),
  },
  handler: async (_ctx, args): Promise<PutResult[]> => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error(
        "GITHUB_TOKEN is not set. Add it in the Keys/API keys tab, then try again.",
      );
    }

    const branch = args.branch ?? "main";
    const results: PutResult[] = [];

    for (const file of args.files) {
      const cleanPath = file.path.replace(/^\/+/, "");
      const url = `${API}/repos/${args.owner}/${args.repo}/contents/${encodeURIComponent(cleanPath)}`;

      // 1. Look up the existing blob SHA (needed to update an existing file)
      let sha: string | undefined;
      const getRes = await fetch(`${url}?ref=${encodeURIComponent(branch)}`, {
        headers: headers(token),
      });
      if (getRes.status === 200) {
        const data = (await getRes.json()) as { sha?: string };
        sha = data.sha;
      } else if (getRes.status !== 404) {
        const body = await getRes.text();
        throw new Error(
          `GitHub lookup failed for ${cleanPath} (HTTP ${getRes.status}): ${body.slice(0, 300)}`,
        );
      }

      // 2. Skip if content is identical
      if (sha) {
        const existing = await fetch(`${url}?ref=${encodeURIComponent(branch)}`, {
          headers: headers(token),
        });
        if (existing.status === 200) {
          const data = (await existing.json()) as {
            content?: string;
            encoding?: string;
          };
          if (data.content && data.encoding === "base64") {
            const existingText = Buffer.from(data.content, "base64").toString("utf8");
            if (existingText === file.content) {
              results.push({ path: cleanPath, status: "unchanged" });
              continue;
            }
          }
        }
      }

      // 3. Create or update the file
      const putRes = await fetch(url, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify({
          message: args.commitMessage,
          content: Buffer.from(file.content, "utf8").toString("base64"),
          branch,
          ...(sha ? { sha } : {}),
        }),
      });

      if (!putRes.ok) {
        const body = await putRes.text();
        throw new Error(
          `GitHub write failed for ${cleanPath} (HTTP ${putRes.status}): ${body.slice(0, 300)}`,
        );
      }

      results.push({ path: cleanPath, status: sha ? "updated" : "created" });
    }

    return results;
  },
});
