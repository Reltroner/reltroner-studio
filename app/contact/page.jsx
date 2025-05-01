"use client";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Heading from "@/components/Heading";

export default function Contact() {
  const recaptchaRef = useRef(null);
  const [verified, setVerified] = useState(false);

  const handleRecaptchaChange = (value) => {
    if (value) setVerified(true);
  };

  // Ambil endpoint dari .env
  const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <Heading>Contact Us</Heading>
      <form
        action={formEndpoint}
        method="POST"
        className="mt-6 space-y-6 bg-white shadow-md rounded-xl p-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
            ref={recaptchaRef}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={!verified}
            className={`w-full text-white font-semibold py-2 px-4 rounded-md transition ${
              verified ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
