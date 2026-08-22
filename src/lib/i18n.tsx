import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "fil";

type Dict = typeof en;

const en = {
  nav: {
    biography: "Biography",
    timeline: "Timeline",
    catalog: "Catalog",
    movie: "The Movie",
    gallery: "Gallery",
    translatorLabel: "Read this site in:",
    en: "English",
    fil: "Filipino",
  },
  hero: {
    kicker: "Mascardo Legacy · A personal archive, 1871 – 1932",
    name: "Heneral Tomás Mascardo",
    subtitle:
      "Teacher. Revolutionary. Governor of two provinces. The general who defied Luna.",
    intro:
      "A biographical archive on General Tomás Mascardo y Echenique — his life in the Philippine Revolution and the Philippine–American War, and how the film Heneral Luna (2015) brought his famous defiance of General Antonio Luna back into public memory.",
    ctaBio: "Read His Story",
    ctaMovie: "See Him in Heneral Luna",
    photoCaption: "Gen. Tomás Mascardo y Echenique (1871–1932)",
  },
  quickFacts: {
    title: "Quick Facts",
    facts: [
      { label: "Born", value: "October 9, 1871 — Cavite El Viejo (now Kawit), Cavite" },
      { label: "Died", value: "July 7, 1932 (age 60) — Cavite, Philippine Islands" },
      { label: "Rank", value: "Brigadier General, Philippine Revolutionary Army" },
      { label: "Faction", value: "Magdalo (Katipunan) · First Philippine Republic" },
      { label: "Offices", value: "Member, Malolos Congress · Governor of Pampanga · Governor of Cavite" },
      { label: "Spouse", value: "Carmen Topacio of Imus — eight children" },
    ],
  },
  bio: {
    kicker: "Biography",
    title: "The Life of a Revolutionary",
    lead: "A plain-language life story, from barrio schoolteacher to brigadier general.",
    early: {
      title: "I. Early Years",
      paras: [
        "Tomás Mascardo was born on October 9, 1871 in Cavite El Viejo — today's Kawit, Cavite — to Valentín Mascardo, a landowner, and Dolores Echenique, a rice dealer. One of seven children of an affluent family, he earned a teacher's diploma from the Escuela Normal in Manila and taught at the barrio school of Halang in Amadeo, Cavite. Before he was ever a soldier, he was an educator — one of the ilustrado-minded young men of Cavite who would soon trade chalk for a rifle.",
      ],
    },
    revolution: {
      title: "II. The Philippine Revolution",
      paras: [
        "Mascardo joined the revolution against Spain from its very beginning, fighting under the Magdalo faction of the Katipunan led by his townmate Emilio Aguinaldo. He rose to become chief of the revolutionary intelligence service in Manila, succeeding Miguel Liedo, who had been captured and executed by the Spaniards.",
        "Aguinaldo ordered him to attack a Spanish stronghold in Tanauan, Batangas — an assault so bold that the general later expressed his awe at Mascardo's courage. He was promoted to brigadier general. On February 17, 1897, fighting beside his commander Gen. Edilberto Evangelista at the Battle of Zapote Bridge, Mascardo was wounded; Evangelista was killed. In 1898 he served as a member of the Malolos Congress, representing Zamboanga.",
      ],
    },
    war: {
      title: "III. The American War & the Luna Conflict",
      paras: [
        "During the Philippine–American War, Mascardo was named commanding general of the revolutionary forces in Pampanga, Bataan, and Zambales, with barracks in Bagac, Bataan. He also served as Governor of Pampanga in 1899.",
        "It was here that Mascardo entered his country's most famous military quarrel. At the Battle of Calumpit, Gen. Antonio Luna ordered him to send troops from Guagua to reinforce the faltering line. Mascardo ignored the order, insisting he had to travel to Arayat to \"inspect troops.\" Luna, furious, resolved to have him detained — but the confrontation between the two proud generals never fully came to pass, and the broken coordination helped doom the defense.",
        "After President Aguinaldo was captured by the Americans in 1901, Mascardo sent his subordinate — Maj. Manuel L. Quezon, the future Commonwealth president — to verify it and seek final instructions. Aguinaldo's answer through Quezon: surrender or keep fighting was Mascardo's own decision. Outgunned, Mascardo surrendered on May 15, 1901, judging that his lack of weaponry meant certain defeat against the well-armed Americans.",
      ],
    },
    later: {
      title: "IV. Later Years & Legacy",
      paras: [
        "Released after the war, Mascardo returned to Cavite and entered politics. He won election as Governor of Cavite, serving one term from 1910 to 1912, then retired to private life. He died of heart disease on July 7, 1932, aged 60.",
        "His name lives on in Cavite — the Tomas Mascardo Bridge (Imus Bridge) on Aguinaldo Highway carries a historical marker — and on screen, where Heneral Luna (2015) cast Lorenz Martinez as the defiant general. In the film's imagery, Mascardo is even given a partially formed moustache: a deliberate symbol, its makeup artist explained, of a man frustrated at being overshadowed by Luna.",
      ],
    },
  },
  timeline: {
    kicker: "Chronology",
    title: "A Life in Dates",
    items: [
      { year: "1871", text: "Born October 9 in Cavite El Viejo (Kawit), son of Valentín Mascardo and Dolores Echenique." },
      { year: "1890s", text: "Earns a teacher's diploma from the Escuela Normal; teaches at the barrio school of Halang, Amadeo, Cavite." },
      { year: "1896", text: "Joins the revolution against Spain from the beginning, with the Magdalo faction of the Katipunan." },
      { year: "1896–97", text: "Heads the revolutionary intelligence service in Manila; leads the daring attack on Tanauan, Batangas; promoted to brigadier general." },
      { year: "Feb 17, 1897", text: "Wounded at the Battle of Zapote Bridge alongside Gen. Edilberto Evangelista, who is killed." },
      { year: "1898", text: "Sits as a member of the Malolos Congress, representing Zamboanga." },
      { year: "1899", text: "Appointed Governor of Pampanga and commanding general of forces in Pampanga, Bataan, and Zambales." },
      { year: "1899", text: "Defies Gen. Antonio Luna's order to reinforce Calumpit from Guagua — the quarrel that history remembers." },
      { year: "May 15, 1901", text: "After sending Quezon to confirm Aguinaldo's capture, surrenders to the Americans." },
      { year: "1910–1912", text: "Elected Governor of Cavite; serves one term, then retires to private life." },
      { year: "July 7, 1932", text: "Dies of heart disease in Cavite, aged 60." },
      { year: "2015", text: "Portrayed by Lorenz Martinez in Jerrold Tarog's film Heneral Luna." },
    ],
  },
  catalog: {
    kicker: "Browse & Search",
    title: "The Catalog",
    lead:
      "Every person, place, event, and screen appearance in this archive, in one searchable index.",
    searchPlaceholder: "Search the catalog by name, place, year, or theme…",
    categories: {
      all: "All",
      people: "People",
      places: "Places",
      events: "Events",
      screen: "On Screen",
    } as Record<string, string>,
    entryCount: (n: number) => `${n} ${n === 1 ? "entry" : "entries"}`,
    noResultsTitle: "Nothing found",
    noResultsBody:
      "No entries match that search. Try a shorter term, or clear the filter to browse everything.",
    clearSearch: "Clear search",
  },
  movie: {
    kicker: "On Screen",
    title: "Mascardo in Heneral Luna (2015)",
    lead: "Jerrold Tarog's acclaimed film dramatizes the Luna–Mascardo conflict. Watch official clips and features from the filmmakers, matched to the moments of Mascardo's story.",
    scenesTitle: "The Situations, On Screen",
    clips: [
      {
        id: "WIc1VuKhjAI",
        source: "TBA Studios · Official Trailer",
        situation: "\"Bayan o sarili?\" — Nation or self?",
        caption:
          "The official trailer introduces the war within the war: Luna's army undermined not just by the Americans but by insubordinate generals like Mascardo, who ignores orders while the front collapses.",
      },
      {
        id: "SwxrnE4yW7g",
        source: "Heneral Luna The Movie · Official channel",
        situation: "The history behind the movie",
        caption:
          "Historian Dr. Vicencio R. José walks through The Rise and Fall of Antonio Luna — the primary source of the film — including the real disobedience of General Mascardo at Calumpit that the movie stages as drama.",
      },
      {
        id: "JBW5_-zTzUg",
        source: "Heneral Luna The Movie · Official channel",
        situation: "The making of the film",
        caption:
          "Behind the scenes with the cast and crew — including how characters like Mascardo and Janolino were deliberately separated from an earlier composite to give each man's defiance its own arc.",
      },
    ],
    triviaTitle: "Details Worth Noticing",
    trivia: [
      "Lorenz Martinez plays Mascardo; Anthony Falcon plays Sgt. Díaz, Mascardo's messenger who delivers his excuses to Luna.",
      "Makeup artist Carmen Reyes gave Mascardo only a partially formed moustache — a deliberate symbol of his frustration at being overshadowed by Luna.",
      "Early drafts merged Mascardo and Capt. Janolino into one composite character, \"Mascolino\"; director Jerrold Tarog split them apart to flesh out both acts of insubordination.",
      "The film is grounded in historian Vivencio R. José's The Rise and Fall of Antonio Luna — the same account that records Mascardo ignoring the order to reinforce Calumpit.",
      "In El Presidente (2012), Mascardo was portrayed by Allan Paule — the same actor who plays Juan Luna, Antonio's brother, in Heneral Luna.",
    ],
    disclaimer:
      "Clips are embedded from the film's official YouTube channels (Artikulo Uno / TBA Studios). The full film is available on TBA Studios' YouTube channel and major streaming platforms.",
  },
  gallery: {
    kicker: "Archival Images",
    title: "Gallery",
    items: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tomas%20Mascardo.jpg?width=640",
        caption: "Portrait of Gen. Tomás Mascardo y Echenique",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Antonio%20luna%20small.jpg?width=640",
        caption: "Gen. Antonio Luna shortly before his assassination (1899)",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tomas%20Mascardo%20Monument%20and%20Historical%20Marker.png?width=640",
        caption: "Mascardo monument and historical marker, Imus City, Cavite",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/General%20Antonio%20Luna%20Death%20Place%20and%20Monument%20(Plaza%20Lucero%2C%20Cabanatuan%20City)%2009.jpg?width=640",
        caption: "Luna monument at Plaza Lucero, Cabanatuan — where the quarrel's other general fell",
      },
    ],
  },
  footer: {
    title: "For Further Study",
    sources: [
      "Carlos Quirino, Who's Who in Philippine History (Tahanan Books, 1995)",
      "Vivencio R. José, The Rise and Fall of Antonio Luna",
      "Wikipedia: Tomás Mascardo · Heneral Luna",
      "Official channels: Heneral Luna The Movie · TBA Studios (YouTube)",
    ],
    note: "Mascardo Legacy — a private archive kept for one reader. History remembers in fragments; read widely.",
  },
};

const fil: Dict = {
  nav: {
    biography: "Talambuhay",
    timeline: "Kronolohiya",
    catalog: "Katalogo",
    movie: "Ang Pelikula",
    gallery: "Galeriya",
    translatorLabel: "Basahin ang site sa:",
    en: "Ingles",
    fil: "Filipino",
  },
  hero: {
    kicker: "Mascardo Legacy · Pansariling arkibo, 1871 – 1932",
    name: "Heneral Tomás Mascardo",
    subtitle:
      "Guro. Rebolusyonaryo. Gobernador ng dalawang lalawigan. Ang heneral na tumutol kay Luna.",
    intro:
      "Isang talambuhay na arsip tungkol sa Heneral Tomás Mascardo y Echenique — ang kaniyang buhay sa Rebolusyong Pilipino at Digmaang Pilipino-Amerikano, at kung paano ibinalik ng pelikulang Heneral Luna (2015) sa publikong alaala ang kaniyang tanyag na pagtutol kay Heneral Antonio Luna.",
    ctaBio: "Basahin ang Kaniyang Kuwento",
    ctaMovie: "Siya sa Heneral Luna",
    photoCaption: "Hen. Tomás Mascardo y Echenique (1871–1932)",
  },
  quickFacts: {
    title: "Mabilisang Katotohanan",
    facts: [
      { label: "Ipinanganak", value: "Oktubre 9, 1871 — Cavite El Viejo (ngayon ay Kawit), Cavite" },
      { label: "Pumanaw", value: "Hulyo 7, 1932 (edad 60) — Cavite, Kapuluang Pilipinas" },
      { label: "Rango", value: "Brigadyer Heneral, Hukbong Rebolusyonaryong Pilipino" },
      { label: "Faksyon", value: "Magdalo (Katipunan) · Unang Republika ng Pilipinas" },
      { label: "Katungkulan", value: "Kasapi, Kongreso ng Malolos · Gobernador ng Pampanga · Gobernador ng Cavite" },
      { label: "Asawa", value: "Carmen Topacio ng Imus — walong anak" },
    ],
  },
  bio: {
    kicker: "Talambuhay",
    title: "Ang Buhay ng Isang Rebolusyonaryo",
    lead: "Payak at malinaw na kuwento ng buhay, mula guro sa baryo hanggang brigadyer heneral.",
    early: {
      title: "I. Maagang Buhay",
      paras: [
        "Ipinanganak si Tomás Mascardo noong Oktubre 9, 1871 sa Cavite El Viejo — ang Kasalukuyang Kawit, Cavite — kina Valentín Mascardo, may-ari ng lupa, at Dolores Echenique, mangangalakal ng bigas. Isa sa pitong anak ng mayamang pamilya, nakakuha siya ng diploma sa pagtuturo mula sa Escuela Normal sa Maynila at naging guro sa baryo ng Halang sa Amadeo, Cavite. Bago siya naging sundalo, guro muna siya — isa sa mga binatang edukado ng Cavite na kapalit ng tsok ay itinanim ang baril.",
      ],
    },
    revolution: {
      title: "II. Ang Rebolusyong Pilipino",
      paras: [
        "Sumali si Mascardo sa rebolusyon laban sa Espanya mula pa sa simula, sa ilalim ng faksiyong Magdalo ng Katipunan na pinamumunuan ng kaniyang kababayang si Emilio Aguinaldo. Naging puno siya ng himagsikap na intelligence service sa Maynila, humalili kay Miguel Liedo na nahuli at pinatay ng mga Kastila.",
        "Inutos ni Aguinaldo na ataakin niya ang isang kuta ng mga Kastila sa Tanauan, Batangas — ataking napakatapang na hinangaan mismo ni Aguinaldo ang kabayanihan ni Mascardo. Itinaas siya sa ranggong brigadyer heneral. Noong Pebrero 17, 1897, habang nakikipaglaban kasama ang kaniyang pinuno na si Hen. Edilberto Evangelista sa Labanan sa Tulay ng Zapote, nasugatan si Mascardo; napatay si Evangelista. Noong 1898, naging kasapi siya ng Kongreso ng Malolos bilang kinatawan ng Zamboanga.",
      ],
    },
    war: {
      title: "III. Digmaang Amerikano at Ang Alitan Kay Luna",
      paras: [
        "Sa Digmaang Pilipino-Amerikano, itinalaga si Mascardo na punong heneral ng mga hukbong rebolusyonaryo sa Pampanga, Bataan, at Zambales, na nakakampo sa Bagac, Bataan. Naging Gobernador din siya ng Pampanga noong 1899.",
        "Dito pumasok si Mascardo sa pinakatanyag na alitang militar ng bansa. Sa Labanan sa Calumpit, inutos ni Hen. Antonio Luna na magpadala siya ng tropa mula sa Guagua upang palakasin ang mahinang depensa. Hindi sinunod ni Mascardo ang utos, at nagmatigas na pupunta siya sa Arayat para sa \"pagsisiyasat ng tropa.\" Galit na galit si Luna at naisip siyang ikulong — ngunit hindi natuloy nang lubos ang banggaan ng dalawang proudest na heneral, at ang sirang koordinasyon ay tumulong sa pagbagsak ng depensa.",
        "Matapos mahuli ng mga Amerikano si Pangulong Aguinaldo noong 1901, ipinadala ni Mascardo ang kaniyang opisyal na si Maj. Manuel L. Quezon — ang magiging pangulo ng Komonwelt — upang kumpirmahin ito at humingi ng huling utos. Sagot ni Aguinaldo kay Quezon: kay Mascardo na ang desisyon na sumuko o ipagpatuloy ang laban. Kulang sa sandata, sumuko si Mascardo noong Mayo 15, 1901, sa pagtataya na tiyak na talo siya laban sa mabibigat na armadong mga Amerikano.",
      ],
    },
    later: {
      title: "IV. Huling Taon at Legasiya",
      paras: [
        "Pagkatapos palayain ng mga Amerikano, bumalik si Mascardo sa Cavite at pumasok sa pulitika. Nanalo siya bilang Gobernador ng Cavite mula 1910 hanggang 1912, at pagkatapos ng isang termino ay nagretiro sa pribadong buhay. Namatay siya sa sakit sa puso noong Hulyo 7, 1932, sa edad 60.",
        "Nabubuhay ang kaniyang pangalan sa Cavite — ang Tulay Tomas Mascardo (Imus Bridge) sa Aguinaldo Highway ay may panandang pangkasaysayan — at sa pelikula, kung saan ginampanan ni Lorenz Martinez ang matapang na heneral sa Heneral Luna (2015). Kahit sa itsura ng pelikula may simbolismo: binigyan si Mascardo ng bahagyang bubungbungan — sadyang simbolo, ayon sa makeup artist, ng lalaking naiinis dahil nalililiman ni Luna.",
      ],
    },
  },
  timeline: {
    kicker: "Kronolohiya",
    title: "Isang Buhay sa mga Petsa",
    items: [
      { year: "1871", text: "Ipinanganak noong Oktubre 9 sa Cavite El Viejo (Kawit), kina Valentín Mascardo at Dolores Echenique." },
      { year: "1890s", text: "Nakakuha ng diploma sa pagtuturo mula sa Escuela Normal; naging guro sa baryo ng Halang, Amadeo, Cavite." },
      { year: "1896", text: "Sumali sa rebolusyon laban sa Espanya mula sa simula, kasama ang faksiyong Magdalo ng Katipunan." },
      { year: "1896–97", text: "Naging puno ng intelligence service sa Maynila; pinuno ang matapang na atake sa Tanauan, Batangas; itinaas sa ranggong brigadyer heneral." },
      { year: "Pebrero 17, 1897", text: "Nasugatan sa Labanan sa Tulay ng Zapote kasama si Hen. Edilberto Evangelista na napatay." },
      { year: "1898", text: "Naging kasapi ng Kongreso ng Malolos bilang kinatawan ng Zamboanga." },
      { year: "1899", text: "Itinalagang Gobernador ng Pampanga at punong heneral ng mga hukbo sa Pampanga, Bataan, at Zambales." },
      { year: "1899", text: "Hindi sinunod ang utos ni Hen. Antonio Luna na palakasin ang Calumpit mula sa Guagua — ang alitang hindi malilimutan ng kasaysayan." },
      { year: "Mayo 15, 1901", text: "Matapos ipaalam ni Quezon ang pagkahuli ni Aguinaldo, sumuko sa mga Amerikano." },
      { year: "1910–1912", text: "Nahalal na Gobernador ng Cavite; naghling ng isang termino at nagretiro sa pribadong buhay." },
      { year: "Hulyo 7, 1932", text: "Pumanaw dahil sa sakit sa puso sa Cavite, edad 60." },
      { year: "2015", text: "Ginampanan ni Lorenz Martinez sa pelikulang Heneral Luna ni Jerrold Tarog." },
    ],
  },
  catalog: {
    kicker: "Mag-browse at Maghanap",
    title: "Ang Katalogo",
    lead:
      "Bawat tao, lugar, pangyayari, at pagganap sa screen sa arkibong ito, nasa iisang hanay na mahanap.",
    searchPlaceholder: "Maghanap sa katalogo — pangalan, lugar, taon, o paksa…",
    categories: {
      all: "Lahat",
      people: "Mga Tao",
      places: "Mga Lugar",
      events: "Mga Pangyayari",
      screen: "Sa Pelikula",
    } as Record<string, string>,
    entryCount: (n: number) =>
      n === 1 ? "1 tala" : `${n} (na) tala`,
    noResultsTitle: "Walang nahanap",
    noResultsBody:
      "Walang tumugma sa hinanap mo. Sumubok ng mas maikling salita, o alisin ang pagsasala upang makita ang lahat.",
    clearSearch: "Burahin ang hinanap",
  },
  movie: {
    kicker: "Sa Pelikula",
    title: "Si Mascardo sa Heneral Luna (2015)",
    lead: "Iginuhit ng kilalang pelikula ni Jerrold Tarog ang alitang Luna–Mascardo. Panoorin ang mga opisyal na clip at tampok mula sa mga gumawa ng pelikula, tugma sa mga sandali ng kuwento ni Mascardo.",
    scenesTitle: "Ang mga Tagpo, Sa Screen",
    clips: [
      {
        id: "WIc1VuKhjAI",
        source: "TBA Studios · Opisyal na Trailer",
        situation: "\"Bayan o sarili?\"",
        caption:
          "Ipakikilala ng opisyal na trailer ang digmaan sa loob ng digmaan: hinding-hindi lang mga Amerikano ang kalaban ni Luna kundi pati ang mga heneraling tulad ni Mascardo na hindi sumusunod sa utos habang bumibigat ang labanan.",
      },
      {
        id: "SwxrnE4yW7g",
        source: "Heneral Luna The Movie · Opisyal na channel",
        situation: "Ang kasaysayan sa likod ng pelikula",
        caption:
          "Iginagabay ni Dr. Vicencio R. José ang aklat na The Rise and Fall of Antonio Luna — ang pangunahing sanggunian ng pelikula — kabilang ang tunay na pagsuway ni Heneral Mascardo sa Calumpit na ginawang drama ng pelikula.",
      },
      {
        id: "JBW5_-zTzUg",
        source: "Heneral Luna The Movie · Opisyal na channel",
        situation: "Ang paggawa ng pelikula",
        caption:
          "Sa likod ng eksena kasama ang cast at crew — kabilang kung paano sadyang inihiwalay sina Mascardo at Janolino mula sa isang kompositong karakter upang bigyan ng sariling kuwento ang bawat pagsuway.",
      },
    ],
    triviaTitle: "Mga Dapat Pansinin",
    trivia: [
      "Si Lorenz Martinez ang gumanap na Mascardo; si Anthony Falcon naman si Sgt. Díaz, ang mensahero ni Mascardo na nagdadala ng mga dahilan kay Luna.",
      "Binigyan si Mascardo ng makeup artist na si Carmen Reyes ng bahagyang bubungbungan — sadyang simbolo ng frustrasyon dahil nalililiman niya kay Luna.",
      "Sa mga unang draft, pinagsama sina Mascardo at Kapt. Janolino sa isang kompositong karakter na \"Mascolino\"; hinati sila ni direk Jerrold Tarog upang maibigay ang tamang diin sa bawat pagsuway.",
      "Nakabatay ang pelikula sa aklat ni Vivencio R. José na The Rise and Fall of Antonio Luna — parehong salaysay na nagtatala ng hindi pagsunod ni Mascardo na palakasin ang Calumpit.",
      "Sa El Presidente (2012), gumanap si Allan Paule na Mascardo — ang parehong aktor na gaganap na Juan Luna, kapatid ni Antonio, sa Heneral Luna.",
    ],
    disclaimer:
      "Naka-embed ang mga clip mula sa opisyal na YouTube channels ng pelikula (Artikulo Uno / TBA Studios). Buong pelikula ay available sa YouTube channel ng TBA Studios at iba pang streaming platforms.",
  },
  gallery: {
    kicker: "Mga Lumang Larawan",
    title: "Galeriya",
    items: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tomas%20Mascardo.jpg?width=640",
        caption: "Larawan ni Hen. Tomás Mascardo y Echenique",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Antonio%20luna%20small.jpg?width=640",
        caption: "Si Hen. Antonio Luna bago siya paslangin (1899)",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tomas%20Mascardo%20Monument%20and%20Historical%20Marker.png?width=640",
        caption: "Monumento at panandang pangkasaysayan ni Mascardo, Lungsod ng Imus, Cavite",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/General%20Antonio%20Luna%20Death%20Place%20and%20Monument%20(Plaza%20Lucero%2C%20Cabanatuan%20City)%2009.jpg?width=640",
        caption: "Monumento ni Luna sa Plaza Lucero, Cabanatuan — kung saan bumagsak ang kabilang heneral sa alitan",
      },
    ],
  },
  footer: {
    title: "Para sa Karagdagang Pag-aaral",
    sources: [
      "Carlos Quirino, Who's Who in Philippine History (Tahanan Books, 1995)",
      "Vivencio R. José, The Rise and Fall of Antonio Luna",
      "Wikipedia: Tomás Mascardo · Heneral Luna",
      "Mga opisyal na channel: Heneral Luna The Movie · TBA Studios (YouTube)",
    ],
    note: "Mascardo Legacy — pansariling arkibo. Sa piraso natin naaalala ang mga bayani — magbasa nang malawak.",
  },
};

const dictionaries: Record<Lang, Dict> = { en, fil };

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}>({ lang: "en", setLang: () => {}, t: en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("mascardo-lang");
    return saved === "fil" ? "fil" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem("mascardo-lang", lang);
    document.documentElement.lang = lang === "fil" ? "fil" : "en";
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  return useContext(LanguageContext);
}
