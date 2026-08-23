#!/usr/bin/env bun
import { readdir, readFile, stat } from "fs/promises";
import { relative, join } from "path";

const TOKEN = process.env.GITHUB_TOKEN!;
const OWNER = "rojadwev";
const REPO = "mascardo-legacy";
const BRANCH = "main";
const ROOT = ".";
const API = "https://api.github.com";

const EXCLUDE_DIRS = new Set(["node_modules", ".git", "dist", "isolate", ".cache"]);
const EXCLUDE_FILES = new Set(["mascardo-legacy.zip", "mascardo-legacy.tar.gz", "package-lock.json", "bun.lock", "vly-toolbar-readonly.tsx"]);

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "Content-Type": "application/json",
  "User-Agent": "mascardo-legacy",
};

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function pushFile(filePath: string) {
  const rel = relative(ROOT, filePath).replace(/\\/g, "/");
  const content = await readFile(filePath, "utf8");
  const url = `${API}/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(rel)}`;

  // Check existing
  let sha: string | undefined;
  const getRes = await fetch(`${url}?ref=${BRANCH}`, { headers });
  if (getRes.status === 200) {
    const data = (await getRes.json()) as { sha?: string };
    sha = data.sha;
    // Skip unchanged
    if (sha) {
      const existing = await fetch(`${url}?ref=${BRANCH}`, { headers });
      if (existing.status === 200) {
        const d = (await existing.json()) as { content?: string; encoding?: string };
        if (d.content && d.encoding === "base64") {
          const existingText = Buffer.from(d.content, "base64").toString("utf8");
          if (existingText === content) {
            return { path: rel, status: "unchanged" as const };
          }
        }
      }
    }
  }

  const putRes = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: `Add ${rel}`,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!putRes.ok) {
    const body = await putRes.text();
    return { path: rel, status: "error" as const, error: `${putRes.status}: ${body.slice(0, 200)}` };
  }

  return { path: rel, status: sha ? ("updated" as const) : ("created" as const) };
}

async function main() {
  console.log("Scanning files...");
  const allFiles = await walk(ROOT);
  console.log(`Found ${allFiles.length} files to push.\n`);

  let created = 0, updated = 0, unchanged = 0, errors = 0;

  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i];
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    process.stdout.write(`[${i + 1}/${allFiles.length}] ${rel}... `);
    const result = await pushFile(file);
    console.log(result.status + (result.status === "error" ? ` — ${result.error}` : ""));
    if (result.status === "created") created++;
    else if (result.status === "updated") updated++;
    else if (result.status === "unchanged") unchanged++;
    else errors++;
    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nDone! ✅ created: ${created}, updated: ${updated}, unchanged: ${unchanged}, errors: ${errors}`);
}

main().catch((e) => {
  console.error("Fatal:", e.message);
  process.exit(1);
});
