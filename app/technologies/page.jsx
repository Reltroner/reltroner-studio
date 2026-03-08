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
    description: "Explore Reltronland’s most advanced energy frontier—an antimatter-powered grid fueled by cosmic particles, Astralis synchronization, and ethical quantum control.",
    slug: "reltronland-antimatter-energy",
    image: "/images/reltronland-antimatter-energy.webp",
    author: "Rei Reltroner",
    published: true,
    date: "2025-04-23"
  },
  {
    title: "Twin Digital Atom (TDA) – Hyperdimensional Core Technology of Reltronland",
    description: "An official, structured blueprint of Twin Digital Atom (TDA), the hyperdimensional simulation, storage, and defense technology that underpins Reltronland as an Apex Civilization.",
    slug: "tda-twin-digital-atom",
    image: "/images/tda-twin-digital-atom.webp",
    author: "Rei Reltroner",
    date: "2025-11-28",
    published: true,
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
  },
  {
    title: "✈️ Tronexus V-Class Starcraft",
    description: "Technical and operational overview of the Tronexus V-Class Starcraft, designed for both military and civilian configurations.",
    slug: "tronexus-v-class",
    image: "/images/tronexus-v-class.webp",
    author: "Reltroner Studio Engineering Division",
    published: true,
    date: "2025-05-09"
  },
  {
    title: "Web3 Library Protocol of Depcutland",
    description: "An innovative, decentralized knowledge infrastructure for transparent contribution, equitable access, and intellectual growth.",
    slug: "web3-library-protocol-depcutland",
    author: "Reltroner Studio",
    date: "2025-06-16",
    published: true,
    image: "/images/web3-library-protocol-depcutland.webp"
  },
  {
    title: "Reltroner Studio Web3 Nation Network",
    description: "Outlining the decentralized vision of interconnected digital nations under Reltroner Studio’s world system, powered by blockchain and intellectual protocols.",
    slug: "reltroner-studio-web3-network",
    author: "Rei Reltroner",
    date: "2025-06-21",
    published: true,
    image: "/images/reltroner-studio-web3-network.webp"
  },
  {
    title: "Reltronland Unified Flow Access & Payment System (UFAPS)",
    description: "UFAPS is Reltronland’s integrated national infrastructure for frictionless mobility and automated payment, combining the Unified Flow Payment System (UFPS) and the Universal Access & Subscription Protocol (UASP) into a queueless, barrierless, and transparent mobility architecture across 3D–5D domains.",
    slug: "ufaps-reltronland",
    image: "/images/ufaps-reltronland.webp",
    author: "Rei Reltroner",
    date: "2026-03-08",
    published: true
  }
];


export default function Techs() {
  return <TechsClient techs={techs} />;
}
