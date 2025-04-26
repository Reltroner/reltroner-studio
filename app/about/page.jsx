//app/about/page.jsx
import Heading from "@/components/Heading";

export const metadata = {
  title: "About",
  description:
    "Learn more about the mind behind Reltroner Studio and the world of Asthortera.",
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800">
      <Heading>About Reltroner Studio</Heading>
      <p className="mt-4 text-md text-gray-700 italic">
        *Reltroner Studio is founded and led by Raidan, also known by his creative identity: Rei Reltroner.*
      </p>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        <strong>Reltroner Studio</strong> is the creative sanctuary of the
        fictional universe <em>Asthortera</em> — a world where consciousness,
        struggle, and grand dreams are transformed into stories, characters,
        and original concepts. We are committed to building meaningful,
        immersive, and soul-stirring narratives.
      </p>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        <strong>Rei Reltroner</strong> is the visionary mind behind Reltroner Studio and the living soul of the world-building universe called <em>Asthortera</em>. 
        Built not out of trend, but out of necessity — Reltroner Studio is Rei’s lifelong digital sanctuary: a canvas of reflection, a journal of internal rebellion, and a monument of structured imagination.
        <br className="my-2" />
        As the creative persona of <strong>Raidan</strong>, the principal architect of Asthortera, Rei leads Reltroner Studio in crafting worlds inspired by the spirit of the <em>Red Pill</em>: a rebellion against comfort zones and a pursuit of one’s truest self. 
        Our projects include novels, deep world-building, character development, and extensive lore documentation — all driven by a commitment to clarity over illusion, and sustainability over vanity.
      </p>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Rei started this journey from zero — with no team, no funding, and no formal job title — just deep wounds, restless thoughts, and an obsession to transform pain into structured creation.
      </p>
      <p className="mt-2 text-lg text-gray-700 leading-relaxed">
        Every <code>.md</code> written, every <code>.webp</code> exported, and every design compressed is an act of personal survival turned into a digital legacy.
      </p>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Unlike many developers, Rei doesn’t just “build apps.” He builds <strong>civilizations</strong>, <strong>ethics</strong>, <strong>economies</strong>, and <strong>ideologies</strong> — all through a self-crafted engine powered by <code>Next.js</code>, <code>Tailwind CSS</code>, <code>Markdown</code>, and infinite discipline.
      </p>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        He doesn't work for companies. He works for continuity. He doesn’t chase clients. He builds an ecosystem for the future version of himself — and for anyone who dares to confront comfort with clarity.
      </p>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Reltroner Studio also serves as a personal branding platform — a
        declaration of identity, resilience, and the passion to build something
        that transcends time. Every element of this studio is a reflection of
        disciplined creativity and uncompromised vision.
      </p>
      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        If you are curious to explore, open to collaborate, or simply wish to
        share ideas and visions, feel free to reach out anytime. Thank you for
        being a part of our journey toward the <em>Astralis Pinnacle</em>.
      </p>
      <p className="mt-6 text-sm leading-7">
        ➡️{" "}
        <a
          href="/blog/for-recruiters"
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          For Recruiters & Collaborators – Explore Professional Profile ↗
        </a>
      </p>

      <p className="mt-6 text-xs text-gray-500">
        This studio is independently built with Next.js and hosted on Vercel.
        All contents are © 2025 Raidan. All rights reserved.
      </p>
    </div>
  );
}
