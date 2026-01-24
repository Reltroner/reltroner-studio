// app/about/page.jsx
import Heading from "@/components/Heading";

export const metadata = {
  title: "About",
  description:
    "About Reltroner Studio — a creative–technology studio at the intersection of system thinking, digital engineering, and narrative clarity.",
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">

      {/* ================= READING PERMISSION ================= */}
      <section className="mb-12 border rounded-lg p-6 bg-gray-50">
        <h2 className="text-xl font-semibold mb-3">
          How to read this page
        </h2>

        <p className="text-gray-700 mb-4">
          You don’t need to read everything below.  
          This page is intentionally long because it documents thinking, not marketing.
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>
            <strong>Light read (1–2 min):</strong> Read the first two sections, then stop.
          </li>
          <li>
            <strong>Professional context (3–5 min):</strong> Read until “Who It’s For”.
          </li>
          <li>
            <strong>Deep alignment (optional):</strong> Read the full page.
          </li>
        </ul>

        <p className="text-sm text-gray-600">
          You can stop reading at any point if this already answers your question.
        </p>
      </section>

      {/* ================= CORE CONTENT ================= */}
      <Heading>About Reltroner Studio</Heading>

      <p className="mt-4 text-md text-gray-700 italic">
        *Reltroner Studio is founded and led by Raidan, also known by his creative
        identity: Rei Reltroner.*
      </p>

      <p className="mt-6 text-lg text-gray-700 leading-relaxed">
        <strong>Reltroner Studio</strong> is a creative–technology studio built at
        the intersection of <strong>system thinking</strong>,{" "}
        <strong>digital engineering</strong>, and{" "}
        <strong>storytelling</strong>.
      </p>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        It was created from real-world struggle, long-term self-building, and
        hands-on problem solving — not from privilege, funding, or institutional
        backing. At its core, Reltroner Studio exists to turn complexity,
        uncertainty, and personal limitations into{" "}
        <strong>structured systems</strong>,{" "}
        <strong>practical tools</strong>, and{" "}
        <strong>meaningful narratives</strong> that help people and organizations
        move forward.
      </p>

      {/* ---- STOP PERMISSION ---- */}
      <p className="mt-6 text-sm text-gray-500 italic">
        You can stop reading here if this level of context is enough.
      </p>
      <br />
      <br />

      {/* ================= WHAT WE DO ================= */}
      <Heading className="mt-12">What We Do</Heading>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Reltroner Studio designs and builds:
      </p>

      <ul className="mt-4 list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
        <li>
          <strong>Digital systems and tools</strong> — SaaS prototypes, HR
          systems, internal tools, and automation-ready platforms.
        </li>
        <li>
          <strong>Technical architectures</strong> — modular systems, API-based
          thinking, and scalable foundations.
        </li>
        <li>
          <strong>Narrative-driven documentation</strong> — clear explanations
          of how problems are solved under real constraints.
        </li>
        <li>
          <strong>Creative frameworks</strong> — translating abstract ideas into
          practical, usable structures.
        </li>
      </ul>

      <p className="mt-6 text-lg text-gray-700 leading-relaxed">
        Rather than separating creativity and technology, Reltroner Studio treats
        them as one integrated discipline:{" "}
        <strong>
          creativity gives systems meaning, and systems give creativity direction
        </strong>.
      </p>

      {/* ---- STOP PERMISSION ---- */}
      <p className="mt-6 text-sm text-gray-500 italic">
        If you’re here for professional understanding, this may already be enough.
      </p>
      <br />
      <br />

      {/* ================= PHILOSOPHY ================= */}
      <Heading className="mt-12">Our Philosophy</Heading>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Modern life is shaped by rapid change, uncertainty, and constant shifts
        in supply and demand. In this environment, skills alone are not enough;
        what matters most is the ability to adapt, think systemically, and
        continue moving forward despite imperfect conditions.
      </p>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Reltroner Studio is built on a simple belief:
      </p>

      <p className="mt-4 text-lg font-semibold text-gray-800 leading-relaxed">
        Growth is not about comfort. <br />
        It is about clarity, structure, and the courage to keep building.
      </p>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        This philosophy shapes how systems are designed, how stories are told,
        and how progress is documented — always grounded in reality, never
        detached from effort.
      </p>
      <br />
      <br />

      {/* ================= DIFFERENTIATION ================= */}
      <Heading className="mt-12">Why Reltroner Studio Is Different</Heading>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Most creative studios focus on aesthetics. <br />
        Most tech products focus on efficiency.
      </p>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        <strong>Reltroner Studio connects both.</strong>
      </p>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        It is not a motivational brand. <br />
        It is not a purely artistic project. <br />
        It is not a generic SaaS factory.
      </p>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Reltroner Studio is a{" "}
        <strong>system-architect mindset disguised as a creative studio</strong>{" "}
        — using narrative and emotion to communicate real technical thinking,
        real work, and real progress.
      </p>
      <br />
      <br />

      {/* ================= WHO IT'S FOR ================= */}
      <Heading className="mt-12">Who It’s For</Heading>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Reltroner Studio resonates with people and teams who:
      </p>

      <ul className="mt-4 list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
        <li>are building without privilege or shortcuts,</li>
        <li>value process over hype,</li>
        <li>believe progress comes from iteration, not perfection,</li>
        <li>want clarity instead of noise,</li>
        <li>see creativity as a way to understand systems, not escape reality.</li>
      </ul>
      <br />
      <br />

      {/* ================= MISSION ================= */}
      <Heading className="mt-12">The Mission</Heading>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        The mission of Reltroner Studio is simple:
      </p>

      <p className="mt-4 text-lg font-semibold text-gray-800 leading-relaxed">
        To document and build systems that help people grow technically,
        mentally, and structurally through honest work and clear thinking.
      </p>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed">
        Reltroner Studio is not about appearing successful. <br />
        It is about becoming capable, step by step, and making that journey
        visible.
      </p>
      <br />
      <br />

      {/* ================= ONE SENTENCE ================= */}
      <Heading className="mt-12">In One Sentence</Heading>

      <p className="mt-4 text-lg text-gray-700 leading-relaxed italic">
        Reltroner Studio turns real-life struggle into systems, tools, and stories
        designed for growth in a fast-changing world.
      </p>
      <br />
      <br />

      {/* ================= EXIT LINKS ================= */}
      <p className="mt-10 text-sm leading-7">
        ➡️{" "}
        <a
          href="/blog/for-recruiters"
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          For Recruiters & Collaborators — Fast professional overview ↗
        </a>
      </p>

      <p className="mt-6 text-xs text-gray-500">
        This studio is independently built with Next.js and hosted on Vercel.
        All contents are © 2025 Raidan. All rights reserved.
      </p>
      <br />

      {/* ================= STRUCTURED DATA ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Rei Reltroner",
            alternateName: "Raidan",
            url: "https://reltroner.com/about",
            worksFor: {
              "@type": "Organization",
              name: "Reltroner Studio",
              url: "https://reltroner.com",
            },
            jobTitle: "Founder & System Architect",
            description:
              "Founder of Reltroner Studio, focused on system thinking, digital engineering, and narrative-driven documentation.",
          }),
        }}
      />
    </div>
  );
}
