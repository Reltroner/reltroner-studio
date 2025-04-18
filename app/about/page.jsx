import Heading from "@/components/Heading";

export const metadata = {
  title: "About",
  description:
    "Learn more about Reltroner Studio and the fictional universe Asthortera.",
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800">
      <Heading>About Reltroner Studio</Heading>
      <p className="mt-4 text-sm leading-7">
        <strong>Reltroner Studio</strong> is the creative sanctuary of the
        fictional universe <em>Asthortera</em> — a world where consciousness,
        struggle, and grand dreams are transformed into stories, characters,
        and original concepts. We are committed to building meaningful,
        immersive, and soul-stirring narratives.
      </p>
      <p className="mt-4 text-sm leading-7">
        Founded by <strong>Raidan</strong>, the principal creator of
        Asthortera, Reltroner Studio crafts worlds inspired by the spirit of
        the <em>Red Pill</em>: a rebellion against comfort zones and a pursuit
        of one’s truest self. Our projects include novels, deep world-building,
        character development, and extensive lore documentation.
      </p>
      <p className="mt-4 text-sm leading-7">
        Reltroner Studio also serves as a personal branding platform — a
        declaration of identity, resilience, and the passion to build something
        that transcends time. Every element of this studio is a reflection of
        disciplined creativity and uncompromised vision.
      </p>
      <p className="mt-4 text-sm leading-7">
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
