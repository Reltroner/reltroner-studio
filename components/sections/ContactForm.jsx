'use client';

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Heading from "@/components/Heading";

export default function ContactForm() {
  const recaptchaRef = useRef(null);
  const [verified, setVerified] = useState(false);
  const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const isCaptchaConfigured = Boolean(recaptchaSiteKey);

  const handleRecaptchaChange = (value) => {
    if (value) {
      setVerified(true);
    }
  };
  const canSubmit = isCaptchaConfigured && verified;

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <Heading>Contact Reltroner Studio</Heading>
      <p className="mt-2 text-gray-600 text-sm dark:text-gray-300">
        If you're a recruiter, collaborator, or fellow visionary, feel free to reach out using the form below. We'll respond as soon as possible.
      </p>
      <form
        action={formEndpoint}
        method="POST"
        className="mt-6 space-y-6 bg-white shadow-md rounded-xl p-6 dark:bg-gray-800"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
          ></textarea>
        </div>

        <div>
          {isCaptchaConfigured ? (
            <ReCAPTCHA
              sitekey={recaptchaSiteKey}
              onChange={handleRecaptchaChange}
              ref={recaptchaRef}
            />
          ) : (
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Contact form verification is unavailable in this environment because
              the public reCAPTCHA site key is not configured.
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full text-white font-semibold py-2 px-4 rounded-md transition ${
              canSubmit ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}