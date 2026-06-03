import type { LogoItem } from "@/components/LogoLoop/LogoLoop";

const CLIENT_LOGO_FILES = [
  "6702.T_BIG.png",
  "align-communications-seeklogo.png",
  "ERIC_BIG.png",
  "EVRG_BIG.png",
  "id03aA64aW_logos.png",
  "id0RJ1_sCu_logos.png",
  "id4F-Ore_3_logos.png",
  "id6-tvzgdK_1755573033967.png",
  "idAE5gkuVB_logos.png",
  "idEKGKciOa_1755533877299.png",
  "idK8qLsMj9_logos.png",
  "idMudl315d_logos.png",
  "idnsHfE2l3_1755534872956.png",
  "idOXdKdstG_1755535071585.png",
  "idPI8ukH_a_1755534578137.png",
  "idRECb5tFz_logos.png",
  "idwJCOvWP7_1755533964881.png",
  "idXfa15ADl_1755820521169.png",
  "images.png",
  "SIE.DE_BIG.png",
  "sponsorium-no-background.png",
  "TMO_BIG.png",
  "verizon-seeklogo.png",
] as const;

const KNOWN_ALTS: Record<string, string> = {
  "align-communications-seeklogo.png": "Align Communications",
  "ERIC_BIG.png": "Ericsson",
  "EVRG_BIG.png": "Evergy",
  "SIE.DE_BIG.png": "Siemens",
  "TMO_BIG.png": "T-Mobile",
  "verizon-seeklogo.png": "Verizon",
  "sponsorium-no-background.png": "Sponsorium",
  "6702.T_BIG.png": "Client partner",
};

function formatAlt(filename: string): string {
  if (filename.startsWith("id")) return "Client partner";
  return filename
    .replace(/\.(png|jpe?g|svg|webp)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const clientLogos: LogoItem[] = CLIENT_LOGO_FILES.map((filename) => ({
  src: `/clientLogos/${filename}`,
  alt: KNOWN_ALTS[filename] ?? formatAlt(filename),
  title: KNOWN_ALTS[filename] ?? formatAlt(filename),
}));
