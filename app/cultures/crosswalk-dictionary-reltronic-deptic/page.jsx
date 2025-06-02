"use client";

import Heading from "@/components/Heading";
import React, { useRef, useEffect } from "react";


const entries = [
  {
    category: "\ud83e\udde0 Cognition & Awareness",
    rows: [
      { english: "Truth", deptic: "Verithur", reltronic: "Klarithrae", notes: "\"Klar\" (clear) + \"thrae\" (unveiling core)" },
      { english: "Memory", deptic: "Ged\u00e4nk", reltronic: "Neumorix", notes: "\"Neu\" (new) + \"morix\" (mental anchor)" },
      { english: "Clarity", deptic: "Klaricht", reltronic: "Klarazen", notes: "\"Klar\" + \"zen\" (mental stillness)" },
      { english: "Inner Vision", deptic: "Sehl", reltronic: "Thraevis", notes: "\"Thrae\" (depth) + \"vis\" (vision)" },
      { english: "Meaning", deptic: "Sinnver", reltronic: "Sinnclar", notes: "\"Sinn\" (sense) + \"clar\" (clarify doctrine)" },
    ],
  },
  {
    category: "\ud83c\udfe9 Governance & Nationhood",
    rows: [
      { english: "Nation-State", deptic: "Z\u00e4ltenreich", reltronic: "Clarizon", notes: "\"Clarity\" + \"Horizon\" symbolic unity" },
      { english: "Constitution", deptic: "Verfassel", reltronic: "Formethrae", notes: "\"Form\" + \"thrae\" (core doctrine)" },
      { english: "Council", deptic: "R\u00e4tkammen", reltronic: "Voxzen", notes: "\"Voice\" + \"Zen\" \u2014 consensus from calmness" },
      { english: "Homeland Power", deptic: "Heimatmacht", reltronic: "Astralwill", notes: "National identity fused with Astralis ethics" },
    ],
  },
  {
    category: "\u2696\ufe0f Ethics & Principle",
    rows: [
      { english: "Justice", deptic: "Gerichtorn", reltronic: "Clarivorn", notes: "\"Clarity\" + \"Pillar\" (ethic structure)" },
      { english: "Honor", deptic: "Ehrstahl", reltronic: "Solareon", notes: "\"Solar\" + \"aeon\" (eternal virtue)" },
      { english: "Forgiveness", deptic: "Vergeburt", reltronic: "Lethaforge", notes: "\"Lethe\" (mythic forgetting) + \"Forge\"" },
      { english: "Moral Decay", deptic: "Verfallung", reltronic: "Abyssenity", notes: "\"Abyss\" + \"entity\" \u2014 loss into the abyss" },
    ],
  },
];

export default function Page() {
    // Buat array of refs untuk setiap section
    const tableRefs = useRef([]);

    // Auto scroll semua table ke kiri saat mount
    useEffect(() => {
        tableRefs.current.forEach((ref) => {
        if (ref) ref.scrollLeft = 0;
        });
    }, []);

  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto px-2 sm:px-6 pt-8 pb-16 sm:pt-12 text-xs sm:text-sm">
      <Heading className="text-2xl sm:text-3xl mb-4">
        🌐 Crosswalk Dictionary: Deptic ↔ Reltronic ↔ English
      </Heading>
      <div className="mb-4">
        <img
          src="/images/crosswalk-dictionary-reltronic-deptic.webp"
          alt="Crosswalk Dictionary: Deptic ↔ Reltronic ↔ English"
          className="w-full h-auto rounded-lg shadow-md mb-2"
          loading="lazy"
        />
        <p className="italic text-sm text-gray-500 text-center mt-2">
          2025-06-01 – Published
        </p>
      </div>
      <hr className="my-6" />

      <p className="italic text-sm text-gray-500 mt-[-0.5rem] mb-6">
        Published: 2025-06-01 · Compiled by: Astralis Doctrine Council
      </p>
      <hr className="my-6" />

      <div className="mb-6 space-y-3">
        <p className="italic text-muted text-sm">
          A hybrid linguistic seed combining the logic of Deptic, the fluidity of Cisthetan, and the transcendence of Astralis Pinnacle — used across Reltronland as a high-clarity identity language.
        </p>
        <p className="text-sm">
          This crosswalk dictionary maps key <strong>root vocabulary</strong> across three interconnected languages:
        </p>
        <ul className="list-disc list-inside pl-4 text-sm">
          <li><strong>Deptic</strong> — Ancestral, archival language of Depcutland</li>
          <li><strong>Reltronic</strong> — Evolved language of Reltronland</li>
          <li><strong>English</strong> — Reference point for global readers</li>
        </ul>
        <p className="text-sm">
          It highlights <em>philosophical divergences</em>, <em>semantic evolution</em>, and <em>doctrinal encoding</em>
          present in the transformation from Deptic to Reltronic.
        </p>
      </div>

      {entries.map((section, idx) => (
        <div key={idx} className="mb-10">
          <h2 className="text-base sm:text-lg font-semibold mt-10 mb-3">{section.category}</h2>
          <div
            ref={el => tableRefs.current[idx] = el}
            className="relative overflow-x-auto rounded-lg border bg-white shadow after:absolute after:top-0 after:right-0 after:w-8 after:h-full after:bg-gradient-to-l after:from-white dark:after:from-slate-900 after:pointer-events-none"
            >
            <table className="w-full table-fixed border text-xs sm:text-sm">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2 text-left w-1/4">English</th>
                  <th className="border px-3 py-2 text-left w-1/4">Deptic</th>
                  <th className="border px-3 py-2 text-left w-1/4">Reltronic</th>
                  <th className="border px-3 py-2 text-left w-1/2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-3 py-2 font-semibold break-words whitespace-normal">{row.english}</td>
                    <td className="border px-3 py-2 break-words whitespace-normal">{row.deptic}</td>
                    <td className="border px-3 py-2 break-words whitespace-normal">{row.reltronic}</td>
                    <td className="border px-3 py-2 break-words whitespace-normal">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <p className="italic text-sm text-center text-gray-500 mt-12">
        Excerpted from the Reltroner Studio Language Codex 2025 · Updated periodically
      </p>
    </div>
  );
}
