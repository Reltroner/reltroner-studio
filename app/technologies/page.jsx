import TechsClient from "./TechsClient";

export const metadata = {
  title: "Technologies",
  description: "Explore the most advanced, AI-regulated technologies across Asthortera — from hyper-speed transit systems to sentient atmospheric control grids, built to sustain a cyber-meritocratic civilization."
};

const techs = [
  {
    title: "Reltronland Hyperloop",
    description: "A 3.3 million km ultra-speed transit network capable of 4,220 km/h, connecting every corner of Reltronland's 25 million km² territory with zero-delay travel.",
    slug: "reltronland-hyperloop",
    image: "/images/reltronland-hyperloop.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11",
  },
  {
    title: "Reltronian AirGrid",
    description: "An AI-governed aerial infrastructure that controls atmospheric logistics, air traffic, and national surveillance across all of Reltronland’s skies.",
    slug: "reltronian-airgrid",
    image: "/images/reltronian-airgrid.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11",
  },
  {
    title: "Entropy Firewall",
    description: "A national defense system designed to detect, neutralize, and isolate cognitive entropy and ideological decay before they spread across systems, networks, or institutions.",
    slug: "entropy-firewall",
    image: "/images/entropy-firewall.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11",
  },
  {
    title: "Quantum Memory Cloud",
    description: "A sovereign AI-encoded memory system that stores and safeguards sentient data, learning patterns, and historical integrity across all generations of Reltronland citizens.",
    slug: "quantum-memory-cloud",
    image: "/images/quantum-memory-cloud.png",
    author: "Reltroner Studio",
    published: true,
    date: "2025-04-11",
  },
];


export default function Techs() {
  return <TechsClient techs={techs} />;
}
