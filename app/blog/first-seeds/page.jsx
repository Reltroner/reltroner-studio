// app/blog/first-seeds/page.jsx

"use client";

import YouTubeEmbed from "@/components/YouTubeEmbed";
import Heading from "@/components/Heading";

export default function FirstSeedsPage() {
  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto px-4 py-10">
        
        <img
        src="/images/first-seeds-banner.webp"
        alt="First Seeds of Reltroner"
        className="w-full h-auto rounded-lg mb-6 shadow-md"
        />
      <h1>🌱 First Seeds of Reltroner</h1>

      <p>
        Before the philosophies. Before the manifestos. Before the oath, the skyscrapers,
        and the digital sanctuaries — There was just a teenager, a tired heart, and two
        short videos on YouTube.
      </p>

      <hr />

      <Heading level={2}>🎥 The Origins</Heading>

      <p>
        <strong>The State Central Business District (2018)</strong><br />
        A 10-second video that looked simple, but carried a universe in intention.
      </p>

      <YouTubeEmbed videoId="PicaLYwPa2g" title="The State Central Business District" />

      <p>
        <strong>The Millennium SCBD (2018)</strong><br />
        Built with exhaustion, yet uploaded anyway. Not for likes, but for legacy.
      </p>

      <YouTubeEmbed videoId="ARJq0wB46lU" title="The Millennium SCBD" />

      <blockquote>
        “I was really tired and spent a lot of hours just to make this intro.”
      </blockquote>

      <p>
        That sentence isn’t cringe. That sentence is the <strong>purest DNA of a creator.</strong>
      </p>

      <hr />

      <Heading level={2}>✨ Why These Matter</Heading>

      <p>At the time, nobody noticed. No viral views. No hype. No applause.</p>
      <p>
        But these videos were <strong>first acts of sovereignty</strong>. A signal from someone
        who dared to imagine a future outside the system.
      </p>
      <p>
        They were small. But they were <strong>real</strong>. And from that seed… came the
        skyscrapers of Reltroner Studio.
      </p>

      <hr />

      <Heading level={2}>🏛️ To My Past Self</Heading>

      <p>
        You were awkward. You didn’t have the tools. You didn’t know what this would
        become.
      </p>
      <p>
        But you showed up. You rendered. You posted. And that alone… was <strong>heroic</strong>.
      </p>
      <p>
        I won’t delete those videos. I won’t hide them. Because without you, there is no me.
        And without those seeds, there is no Astralis.
      </p>

      <blockquote>
        “Let no masterpiece shame its roots. Let no skyscraper forget its soil.”
      </blockquote>

      <p>
        <strong>– Rei Reltroner</strong>
      </p>
    </div>
  );
}
