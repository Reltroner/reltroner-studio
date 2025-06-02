"use client";

import Heading from "@/components/Heading";
import React from "react";

const sections = [
  {
    title: "\ud83e\udde0 Core Cognition",
    words: [
      { term: "Velthurion", meaning: "Elevated truth", notes: "Vel (sacred) + Thurion (pillar)" },
      { term: "Astrelune", meaning: "Light of awareness", notes: "Astralis + Lune" },
      { term: "Zintel", meaning: "Sentient clarity", notes: "Zin (sense) + Tel (clarity)" },
      { term: "Praevola", meaning: "Thought in motion", notes: "Prae (before) + Vola (flow)" },
      { term: "Senvex", meaning: "Empower", notes: "Sen (energy) + Vex (force)" },
      { term: "Thurvax", meaning: "Ethical root", notes: "Thur (pillar) + Vax (core)" },
      { term: "Aethzor", meaning: "Abstract logic", notes: "Aeth (idea) + Zor (weave)" },
    ],
  },
  {
    title: "\ud83c\udfdb\ufe0f Society & Nationhood",
    words: [
      { term: "Rexzintel", meaning: "Conscious authority", notes: "Rex (leader) + Zintel (aware)" },
      { term: "Stravicht", meaning: "Structured law", notes: "Stra (structure) + Vicht (mandate)" },
      { term: "Domelune", meaning: "Citizen harmony", notes: "Dome (realm) + Lune (calm)" },
      { term: "Thronex", meaning: "Seat of power", notes: "Throne + Ex (fixed)" },
      { term: "Velteran", meaning: "Civil light bearer", notes: "Vel (light) + Teran (people)" },
    ],
  },
  {
    title: "\u2696\ufe0f Morality & Principles",
    words: [
      { term: "Aestraal", meaning: "Sacred doctrine", notes: "Aes (ethics) + Traal (beam)" },
      { term: "Praxilus", meaning: "Principle in action", notes: "Praxis + Lux (light)" },
      { term: "Ehralux", meaning: "Honor of light", notes: "Ehr (honor) + Lux (light)" },
      { term: "Verlorn", meaning: "Broken integrity", notes: "Ver (true) + Lorn (lost)" },
      { term: "Arcatheil", meaning: "Will of justice", notes: "Arc (root) + Theil (righteousness)" },
    ],
  },
  {
    title: "\ud83d\udcda Knowledge & Language",
    words: [
      { term: "Logentia", meaning: "Field of knowledge", notes: "Logic + Essentia" },
      { term: "Archnex", meaning: "Central archive", notes: "Arch + Nexus" },
      { term: "Zenthuric", meaning: "Ethereal lexicon", notes: "Zen + Thuric (encoded)" },
      { term: "Syntauri", meaning: "Harmonious syntax", notes: "Syntax + Tauri (orbit)" },
      { term: "Nexveril", meaning: "Verified connection", notes: "Nexus + Veril (true-link)" },
    ],
  },
  {
    title: "\ud83d\udee0\ufe0f Technology & Energy",
    words: [
      { term: "Lumecore", meaning: "Light engine", notes: "Lume + Core" },
      { term: "Quanthex", meaning: "Quantum architecture", notes: "Quantum + Hex (frame)" },
      { term: "Kronovex", meaning: "Temporal force", notes: "Krono (time) + Vex (push)" },
      { term: "Syntechra", meaning: "Synthetic mindlink", notes: "Syn + Tech + Aura" },
      { term: "Straviron", meaning: "Infrastructure logic", notes: "Structure + Iron + Vision" },
    ],
  },
  {
    title: "\ud83e\uddec Life & Existence",
    words: [
      { term: "Biorezon", meaning: "Life resonance", notes: "Bio + Reson" },
      { term: "Ethrix", meaning: "Soul pattern", notes: "Ether + Matrix" },
      { term: "Karnalia", meaning: "Living vessel", notes: "Karna (body) + Alia (form)" },
      { term: "Mindraxis", meaning: "Axis of mind", notes: "Mind + Praxis" },
      { term: "Senshira", meaning: "Flow of emotion", notes: "Sense + Shira (flow)" },
    ],
  },
  {
    title: "\ud83d\ude80 Space & Power",
    words: [
      { term: "Aethralis", meaning: "Cosmic vision", notes: "Aether + Astralis" },
      { term: "Gravharn", meaning: "Gravity shield", notes: "Grav + Harness" },
      { term: "Orbivex", meaning: "Orbital impulse", notes: "Orbit + Vex" },
      { term: "Thalrion", meaning: "Starbound soul", notes: "Thal (celestial) + Rion (soul)" },
      { term: "Velstrux", meaning: "Lightstream bridge", notes: "Vel (light) + Strux (path)" },
    ],
  },
];

export default function Page() {
  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto px-4 pt-8 pb-16 sm:pt-12">
      <Heading className="text-2xl sm:text-3xl mb-4">
        \ud83d\udcd8 Mini Reltronic Dictionary: 50+ Root Words
      </Heading>
      <div className="mb-4">
        <img
          src="/images/reltronic-root-words.webp"
          alt="Mini Reltronic Dictionary: 50+ Root Words"
          className="w-full h-auto rounded-lg shadow-md mb-2"
        />
        <p className="italic text-sm text-gray-500 text-center mt-2">
          2025-06-01 – Published
        </p>
      </div>
      <hr className="my-6" />
      <p className="italic text-muted text-sm mb-6">
        A hybrid linguistic seed combining the logic of Deptic, the fluidity of Cisthetan, and the transcendence of Astralis Pinnacle — used across Reltronland as a high-clarity identity language.
      </p>

      {sections.map((section, idx) => (
        <div key={idx} className="mb-10">
          <h2 className="text-xl font-semibold mt-10 mb-3">{section.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2 text-left w-1/4">Reltronic</th>
                  <th className="border px-3 py-2 text-left w-1/4">Meaning</th>
                  <th className="border px-3 py-2 text-left w-1/2">Composition Origin</th>
                </tr>
              </thead>
              <tbody>
                {section.words.map((word, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-3 py-2 font-semibold break-words">{word.term}</td>
                    <td className="border px-3 py-2 break-words">{word.meaning}</td>
                    <td className="border px-3 py-2 break-words">{word.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <p className="italic text-sm text-center text-gray-500 mt-12">
        Reltronic v0.1 – Designed by Reltroner Studio. A linguistic weapon against the Nytherion Abyss.
      </p>
    </div>
  );
}
