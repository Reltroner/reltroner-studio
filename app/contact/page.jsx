import Script from "next/script";
import ContactForm from "@/components/sections/ContactForm";
import { toAbsoluteUrl } from "@/lib/seo/canonical";
import { buildStandaloneMetadata } from "@/lib/seo/metadata";

export const metadata = buildStandaloneMetadata({
  title: "Contact",
  description:
    "Reach out to Reltroner Studio for collaboration, feedback, or visionary partnerships related to worldbuilding, storytelling, and digital development.",
  pathname: "/contact",
  image: "/images/reltroner-studio-banner.webp",
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Reltroner Studio",
  description:
    "Reach out to Reltroner Studio for collaboration, feedback, or visionary partnerships related to worldbuilding, storytelling, and digital development.",
  url: "https://www.reltroner.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Reltroner Studio",
    url: "https://www.reltroner.com",
    logo: {
      "@type": "ImageObject",
      url: toAbsoluteUrl("/images/logo.webp"),
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactForm />
      <Script
        id="contact-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
    </>
  );
}
