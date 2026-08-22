export type CatalogCategory = "people" | "places" | "events" | "screen";

export type CatalogEntry = {
  id: string;
  category: CatalogCategory;
  title: string;
  years?: string;
  summary: { en: string; fil: string };
  tags: string[];
};

export const catalogCategories: CatalogCategory[] = [
  "people",
  "places",
  "events",
  "screen",
];

export const catalogEntries: CatalogEntry[] = [
  {
    id: "mascardo",
    category: "people",
    title: "Tomás Mascardo",
    years: "1871 – 1932",
    summary: {
      en: "The subject of this archive: a Cavite-born schoolteacher who became a brigadier general of the revolution, defied Luna at Calumpit, and later served as governor of Pampanga and Cavite.",
      fil: "Paksa ng arkibong ito: guro mula sa Cavite na naging brigadyer heneral ng rebolusyon, sumuway kay Luna sa Calumpit, at kalauna'y naging gobernador ng Pampanga at Cavite.",
    },
    tags: ["general", "Magdalo", "Kawit", "teacher", "governor"],
  },
  {
    id: "luna",
    category: "people",
    title: "Antonio Luna",
    years: "1866 – 1899",
    summary: {
      en: "The fiery commanding general whose reinforcement order Mascardo ignored at Calumpit; assassinated by soldiers of his own army in Cabanatuan in June 1899.",
      fil: "Ang matapang na punong heneral na ang utos na pagpapalakas ng tropa ay hindi sinunod ni Mascardo sa Calumpit; pinaslang ng mga sundalo ng sarili niyang hukbo sa Cabanatuan noong Hunyo 1899.",
    },
    tags: ["general", "Calumpit", "assassination"],
  },
  {
    id: "aguinaldo",
    category: "people",
    title: "Emilio Aguinaldo",
    years: "1869 – 1964",
    summary: {
      en: "Mascardo's townmate from Kawit and commander-in-chief; president of the First Philippine Republic whose capture in 1901 opened the way to Mascardo's surrender.",
      fil: "Kababayang taga-Kawit at pangkalahatang pinuno ni Mascardo; pangulo ng Unang Republika ng Pilipinas na ang pagkahuli noong 1901 ay nagbukas ng daan sa pagsuko ni Mascardo.",
    },
    tags: ["president", "Kawit", "Magdalo"],
  },
  {
    id: "quezon",
    category: "people",
    title: "Manuel L. Quezon",
    years: "1878 – 1944",
    summary: {
      en: "Then a major under Mascardo, sent in 1901 to confirm Aguinaldo's capture and carry back his final instructions; two decades later, the first president of the Commonwealth.",
      fil: "Noong panahong iyon ay major sa ilalim ni Mascardo, ipinadala noong 1901 upang kumpirmahin ang pagkahuli ni Aguinaldo at magdala ng huling utos; makalipas ang dalawang dekada, unang pangulo ng Komonwelt.",
    },
    tags: ["surrender", "messenger", "Commonwealth"],
  },
  {
    id: "evangelista",
    category: "people",
    title: "Edilberto Evangelista",
    years: "1869 – 1897",
    summary: {
      en: "The engineer-general under whom Mascardo fought at Zapote Bridge; killed in that battle on the same day Mascardo was wounded.",
      fil: "Ang heneral na inhinyero na kabilang pinuno ni Mascardo sa Tulay ng Zapote; napatay sa labang iyon sa araw ding nasugatan si Mascardo.",
    },
    tags: ["general", "Zapote Bridge", "1897"],
  },
  {
    id: "topacio",
    category: "people",
    title: "Carmen Topacio",
    summary: {
      en: "Mascardo's wife from Imus, Cavite, and mother of their eight children — including Dominador, who followed his father into the military as a general.",
      fil: "Asawa ni Mascardo mula sa Imus, Cavite, at ina ng kanilang walong anak — kabilang si Dominador na sumunod sa yapak ng ama bilang heneral.",
    },
    tags: ["family", "Imus"],
  },
  {
    id: "martinez",
    category: "people",
    title: "Lorenz Martinez",
    summary: {
      en: "The actor who portrayed Tomás Mascardo in Jerrold Tarog's Heneral Luna (2015), including the scenes of defiance at Calumpit.",
      fil: "Ang aktor na gumanap kay Tomás Mascardo sa Heneral Luna (2015) ni Jerrold Tarog, kabilang ang mga tagpo ng pagsuway sa Calumpit.",
    },
    tags: ["actor", "Heneral Luna", "portrayal"],
  },
  {
    id: "kawit",
    category: "places",
    title: "Kawit (Cavite El Viejo)",
    summary: {
      en: "Mascardo's birthplace, then called Cavite El Viejo; hometown of Aguinaldo and cradle of the Magdalo faction of the Katipunan.",
      fil: "Lugar ng kapanganakan ni Mascardo, dating Cavite El Viejo; bayan nina Aguinaldo at sinilangan ng faksiyong Magdalo ng Katipunan.",
    },
    tags: ["Cavite", "birthplace", "Magdalo"],
  },
  {
    id: "bagac",
    category: "places",
    title: "Bagac, Bataan",
    summary: {
      en: "Site of the barracks where Mascardo commanded the revolutionary forces of Pampanga, Bataan, and Zambales during the American war.",
      fil: "Lugar ng kampo kung saan namuno si Mascardo sa mga hukbong rebolusyonaryo ng Pampanga, Bataan, at Zambales noong digmaan laban sa mga Amerikano.",
    },
    tags: ["Bataan", "headquarters", "command"],
  },
  {
    id: "calumpit",
    category: "places",
    title: "Calumpit, Bulacan",
    summary: {
      en: "The riverfront defense where Luna's order to bring troops from Guagua went unheeded — the quarrel that fixed Mascardo's place in history.",
      fil: "Ang depensa sa pampang ng ilog kung saan hindi sinunod ang utos ni Luna na dalhin ang tropa mula sa Guagua — ang alitang gumawa kay Mascardo bahagi ng kasaysayan.",
    },
    tags: ["battle", "1899", "Luna"],
  },
  {
    id: "imus",
    category: "places",
    title: "Imus, Cavite",
    summary: {
      en: "Home town of the Topacio family, later Mascardo's own residence; today its Imus Bridge is named the Tomas Mascardo Bridge and carries a historical marker.",
      fil: "Bayan ng pamilyang Topacio at kalauna'y tahanan mismo ni Mascardo; ngayon ang Imus Bridge dito ay pinangalanang Tulay Tomas Mascardo na may panandang pangkasaysayan.",
    },
    tags: ["Cavite", "bridge", "marker"],
  },
  {
    id: "zapote",
    category: "events",
    title: "Battle of Zapote Bridge",
    years: "February 17, 1897",
    summary: {
      en: "A fierce Spanish assault on revolutionary lines south of Manila; Gen. Edilberto Evangelista was killed and Mascardo wounded while holding the line.",
      fil: "Mabigat na atake ng mga Kastila sa mga linya ng rebolusyon sa timog ng Maynila; napatay si Hen. Edilberto Evangelista at nasugatan si Mascardo habang pinipigilan ang linya.",
    },
    tags: ["battle", "revolution", "wounded", "1897"],
  },
  {
    id: "malolos",
    category: "events",
    title: "Malolos Congress",
    years: "1898 – 1899",
    summary: {
      en: "The constituent assembly of the First Philippine Republic, where Mascardo sat as a representative of Zamboanga.",
      fil: "Ang asembleyang konstitusyonal ng Unang Republika ng Pilipinas, kung saan naging kinatawan si Mascardo ng Zamboanga.",
    },
    tags: ["congress", "Malolos", "republic", "1898"],
  },
  {
    id: "calumpit-battle",
    category: "events",
    title: "Defense of Calumpit & the Luna Order",
    years: "1899",
    summary: {
      en: "With the American advance pressing the line, Luna ordered Mascardo to reinforce Calumpit from Guagua; Mascardo pleaded an inspection trip to Arayat instead. The coordination never came.",
      fil: "Habang dumadagsa ang mga Amerikano, inutos ni Luna kay Mascardo na palakasin ang Calumpit mula sa Guagua; nagdahilan si Mascardo ng inspeksiyon sa Arayat. Hindi dumating ang sinumang ayuda.",
    },
    tags: ["battle", "insubordination", "Luna", "Guagua", "Arayat"],
  },
  {
    id: "surrender",
    category: "events",
    title: "Surrender of General Mascardo",
    years: "May 15, 1901",
    summary: {
      en: "After Quezon confirmed Aguinaldo's capture and returned with the president's answer — that the choice was Mascardo's alone — the general laid down his arms, outgunned by the Americans.",
      fil: "Matapos kumpirmahin ni Quezon ang pagkahuli ni Aguinaldo at ibalik ang sagot ng pangulo — na kay Mascardo lamang ang desisyon — isinuko ng heneral ang kaniyang sandata dahil kulang sa armamento.",
    },
    tags: ["surrender", "1901", "Quezon", "Aguinaldo"],
  },
  {
    id: "heneral-luna",
    category: "screen",
    title: "Heneral Luna",
    years: "2015",
    summary: {
      en: "Jerrold Tarog's biopic of Antonio Luna, in which Mascardo's disobedience becomes a turning point; directed with historical grounding in Vivencio R. José's The Rise and Fall of Antonio Luna.",
      fil: "Bidyo-pelikula ni Jerrold Tarog tungkol kay Antonio Luna, kung saan ang pagsuway ni Mascardo ay naging kasukdulan; nakabatay sa aklat ni Vivencio R. José na The Rise and Fall of Antonio Luna.",
    },
    tags: ["film", "Jerrold Tarog", "TBA Studios", "Lorenz Martinez"],
  },
  {
    id: "el-presidente",
    category: "screen",
    title: "El Presidente",
    years: "2012",
    summary: {
      en: "The earlier Aguinaldo biopic in which Allan Paule played Mascardo — the same actor who appears as Juan Luna, Antonio's brother, in Heneral Luna.",
      fil: "Ang mas maagang bidyo-pelikula tungkol kay Aguinaldo kung saan gumanap si Allan Paule bilang Mascardo — ang parehong aktor na si Juan Luna, kapatid ni Antonio, sa Heneral Luna.",
    },
    tags: ["film", "Allan Paule", "Aguinaldo", "trivia"],
  },
];
