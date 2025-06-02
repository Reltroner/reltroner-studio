// app/cultures/mini-deptic-dictionary/page.jsx

"use client";

import Heading from "@/components/Heading";
import React from 'react';

const sections = [
  {
    title: '🧠 Cognitive & Awareness Terms',
    words: [
      { term: 'Verithur', meaning: 'Truth', notes: '"Veritas" + "thur" (pillar)' },
      { term: 'Gedänk', meaning: 'Memory', notes: 'Derived from “Gedächtnis”' },
      { term: 'Klaricht', meaning: 'Clarity', notes: '"Klar" + "Licht"' },
      { term: 'Sehl', meaning: 'Inner vision', notes: 'Spiritual root' },
      { term: 'Sinnver', meaning: 'Meaning', notes: '"Sinn" (sense) + "ver" (true)' },
      { term: 'Traümlicht', meaning: 'Lucid vision/dream', notes: '"Traüm" + "Licht"' },
      { term: 'Zönheit', meaning: 'Grand consciousness', notes: '"Zonen" + "Einheit"' },
    ],
  },
  {
    title: '🏛️ Government & Statehood',
    words: [
      { term: 'Zältenreich', meaning: 'Nation-State', notes: 'Nation + Realm' },
      { term: 'Thronhaus', meaning: 'Seat of power', notes: 'Throne + House' },
      { term: 'Verfassel', meaning: 'Constitution', notes: '"Verfassung" + "vessel"' },
      { term: 'Rätkammen', meaning: 'Grand council', notes: 'Council + Chamber' },
      { term: 'Grundsturm', meaning: 'Foundational revolt', notes: 'Base + Storm' },
      { term: 'Heimatmacht', meaning: 'Homeland force', notes: 'Homeland + Power' },
    ],
  },
  {
    title: '⚖️ Ethics & Principles',
    words: [
      { term: 'Gerichtorn', meaning: 'Justice pillar', notes: 'Justice + tower/root' },
      { term: 'Ästhemor', meaning: 'Ethical aesthetics', notes: 'Aesthetic + Moral' },
      { term: 'Sturnmacht', meaning: 'Sacred silence', notes: 'Storm + Power' },
      { term: 'Ehrstahl', meaning: 'Honor of steel', notes: 'Honor + Steel' },
      { term: 'Vergeburt', meaning: 'Forgiveness reborn', notes: 'Forgive + Birth' },
      { term: 'Verfallung', meaning: 'Moral decay', notes: '"Verfall" (decay)' },
    ],
  },
  {
    title: '📚 Research & Knowledge',
    words: [
      { term: 'Archivhölt', meaning: 'Supreme archive', notes: 'Archive + Hold' },
      { term: 'Forschgrund', meaning: 'Research foundation', notes: 'Research + Base' },
      { term: 'Lernpfad', meaning: 'Learning path', notes: 'Learn + Path' },
      { term: 'Doktrinwerk', meaning: 'Doctrine manuscript', notes: 'Doctrine + Work' },
      { term: 'Vortheorien', meaning: 'Proto-theories', notes: 'Proto + Theories' },
    ],
  },
  {
    title: '🛠️ Technology & Innovation',
    words: [
      { term: 'Maschglanz', meaning: 'Glowing machine', notes: 'Machine + Shine' },
      { term: 'Zukunfttor', meaning: 'Gate of the future', notes: 'Future + Gate' },
      { term: 'Quantfenster', meaning: 'Quantum window', notes: 'Quantum + Window' },
      { term: 'Kernstruktur', meaning: 'Core structure', notes: 'Core + Structure' },
      { term: 'Zentralfluss', meaning: 'Central current', notes: 'Central + Flow' },
    ],
  },
  {
    title: '🧬 Biologic & Existential',
    words: [
      { term: 'Lebensreich', meaning: 'Realm of life', notes: 'Life + Realm' },
      { term: 'Schöpfwille', meaning: 'Will of creation', notes: 'Creation + Will' },
      { term: 'Nervkristall', meaning: 'Core of feeling', notes: 'Nerve + Crystal' },
      { term: 'Körperpfad', meaning: "Body's path", notes: 'Body + Path' },
    ],
  },
  {
    title: '🎖️ Military & Strategy',
    words: [
      { term: 'Waffenrund', meaning: 'Weapon circuit', notes: 'Weapon + Circle' },
      { term: 'Taktgebot', meaning: 'Tactical command', notes: 'Tactic + Command' },
      { term: 'Schachfeld', meaning: 'Strategy board', notes: 'Chessboard' },
      { term: 'Schildtor', meaning: 'Shield gate', notes: 'Shield + Gate' },
      { term: 'Sturmkomm', meaning: 'Storm command', notes: 'Storm + Command' },
    ],
  },
  {
    title: '📜 Spiritual & Philosophical',
    words: [
      { term: 'Höchlehre', meaning: 'Supreme teaching', notes: 'Highest + Teaching' },
      { term: 'Innerglanz', meaning: 'Inner light', notes: 'Inner + Shine' },
      { term: 'Lichtwille', meaning: 'Will of light', notes: 'Light + Will' },
      { term: 'Dunkelgrund', meaning: 'Depth of darkness', notes: 'Darkness + Ground' },
      { term: 'Astralehre', meaning: 'Astralis doctrine', notes: 'Astralis + Doctrine' },
    ],
  },
];

export default function Page() {
  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto px-4 pt-8 pb-16 sm:pt-12">
      <Heading className="text-2xl sm:text-3xl mb-4">📘 Mini Deptic Dictionary: 50+ Root Words</Heading>
      <div className="mb-4">
        <img
          src="/images/mini-deptic-dictionary.webp"
          alt="Mini Deptic Dictionary: 50+ Root Words"
          className="w-full h-auto rounded-lg shadow-md mb-2"
        />
        <p className="italic text-sm text-gray-500 text-center mt-2">
          2025-06-01 – Published
        </p>
      </div>
      <hr className="my-6" />

      <p className="text-muted mb-10 mt-6 leading-relaxed text-[1.05rem]">
        A compact lexicon designed to seed the Deptic language — a philosophically functional tongue inspired by Germanic structure, used across Depcutland and the planet Depeisit for communication in law, research, ethics, and doctrine.
      </p>

      {sections.map((section, idx) => (
        <div key={idx} className="mb-10">
          <h2 className="text-xl font-semibold mt-10 mb-3">{section.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2 text-left w-1/4">Deptic</th>
                  <th className="border px-3 py-2 text-left w-1/4">Meaning</th>
                  <th className="border px-3 py-2 text-left w-1/2">Notes</th>
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
        End of dictionary Mini Deptic v1.0 – Powered by Astralis Pinnacle Doctrine.
      </p>
    </div>
  );
}
