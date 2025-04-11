import FactionsClient from "./FactionsClient";

export const metadata = {
  title: "Factions",
  description: "Discover the major ideological factions that shape the destiny of Asthortera — from cyber-meritocratic nations to shadow organizations and metaphysical cults."
};

const factions = [
  {
    title: "Reltronland",
    description: "The ideological embodiment of Astralis Pinnacle — a disciplined superpower built on meritocracy, sentient development, and the rejection of illusion.",
    slug: "reltronland",
    image: "/images/reltronland-cover.png",
    author: "Rei Reltroner",
    date: "2025-04-10"
  },
  // {
  //   title: "Henchoeway",
  //   description: "A manipulative organization that seeks to control minds and systems through illusion, stagnation, and psychological warfare. The brain behind the abyss.",
  //   slug: "henchoeway",
  //   image: "/images/henchoeway-cover.png",
  //   author: "Rei Reltroner",
  //   date: "2025-04-10"
  // },
  // {
  //   title: "Nytherion Cult",
  //   description: "A secretive spiritual order worshipping the power of comfort, fear, and emotional paralysis. Their belief: peace exists only in stillness — even if it means death of progress.",
  //   slug: "nytherion-cult",
  //   image: "/images/nytherion-cult-cover.png",
  //   author: "Rei Reltroner",
  //   date: "2025-04-10"
  // },
  // {
  //   title: "Astralis Vanguard",
  //   description: "The elite force of awakened minds who guard the path to Astralis Pinnacle. Trained to endure truth, lead with clarity, and resist every form of manipulation.",
  //   slug: "astralis-vanguard",
  //   image: "/images/astralis-vanguard-cover.png",
  //   author: "Rei Reltroner",
  //   date: "2025-04-10"
  // }
];


export default function Factions() {
  return <FactionsClient factions={factions} />;
}
