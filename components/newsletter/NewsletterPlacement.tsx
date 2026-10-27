import NewsletterSection from './NewsletterSection';

/**
 * Shared newsletter placement. Keep activation conditions identical on
 * every route; NewsletterSection owns hostname checks and SubscribeForm.
 */
export default function NewsletterPlacement() {
  const activationVerified =
    process.env.RESEND_NEWSLETTER_ENABLED === 'true' &&
    process.env.CLOUDFLARE_WAF_PROTECTION_VERIFIED === 'true' &&
    process.env.RESEND_HARD_STOP_VERIFIED === 'true' &&
    process.env.RESEND_UNSUBSCRIBE_VERIFIED === 'true';

  return (
    <div className="studio-section">
      <div className="studio-wrap">
        <NewsletterSection activationVerified={activationVerified} />
      </div>
    </div>
  );
}
