import TechsClient from "./TechsClient";

export const metadata = {
  title: "Technologies",
  description: "Explore the most advanced, AI-regulated technologies across Asthortera — from hyper-speed transit systems to sentient atmospheric control grids, built to sustain a cyber-meritocratic civilization."
};

const techs = [
  {
    title: "Reltronland Hyperloop",
    description: "A 14.7 million km ultra-speed transit network capable of 4,220 km/h, connecting every corner of Reltronland's 104 million km² territory with zero-delay travel.",
    slug: "reltronland-hyperloop",
    image: "/images/reltronland-hyperloop.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11",
  },
  {
    title: "Reltronian AirGrid",
    description: "An AI-governed aerial infrastructure that controls atmospheric logistics, air traffic, and national surveillance across all of Reltronland’s skies.",
    slug: "reltronian-airgrid",
    image: "/images/reltronian-airgrid.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11",
  },
  {
    title: "Entropy Firewall",
    description: "A national defense system designed to detect, neutralize, and isolate cognitive entropy and ideological decay before they spread across systems, networks, or institutions.",
    slug: "entropy-firewall",
    image: "/images/entropy-firewall.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11",
  },
  {
    title: "Quantum Memory Cloud",
    description: "A sovereign AI-encoded memory system that stores and safeguards sentient data, learning patterns, and historical integrity across all generations of Reltronland citizens.",
    slug: "quantum-memory-cloud",
    image: "/images/quantum-memory-cloud.webp",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11",
  },
  {
    title: "🌍♻️ Advanced Waste Management System in Reltronland",
    description: "Discover how Reltronland leads Asthortera with its AI-powered waste system—featuring 100+ smart bins that reject improper trash and monitor urban hygiene in real time.",
    slug: "reltronland-waste-management",
    image: "/images/reltronland-waste-management.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-23",
  },
  {
    title: "⚛️ Anti-Matter Energy Tech of Reltronland",
    description: "Explore Reltronland’s most advanced energy frontier—an antimatter-powered grid fueled by cosmic particles, Aurora synchronization, and ethical quantum control.",
    slug: "reltronland-antimatter-energy",
    image: "/images/reltronland-antimatter-energy.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-23"
  },
  {
    title: "🌌 Aurora Synchronization Technologies Across Asthortera",
    description: "Explore how every nation in Asthortera harnesses the aurora—not just as light, but as energy, memory, and consciousness in motion.",
    slug: "aurora-synchronization-tech",
    image: "/images/aurora-synchronization-tech.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-23"
  },
  {
    title: "☀️ Solar Flare Technology in Asthortera",
    description: "A deep exploration into how Asthortera transforms wild solar flare energy bursts into structured energy systems using satellites, towers, and hybrid reactors—balancing cosmic chaos with sentient design.",
    slug: "solar-flare-technology",
    image: "/images/solar-flare-technology.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-24"
  }
];


export default function Techs() {
  return <TechsClient techs={techs} />;
}
