/**
 * A self-contained, scalable Contact illustration.
 * Two different thought-spaces are connected by a shared path of light.
 * No placeholder icon, person, chat bubble, or artificial social proof.
 */
export default function ContactConversationArt() {
  return (
    <figure
      className="studio-art"
      style={{ aspectRatio: '4 / 3' }}
      role="img"
      aria-label="Non-canon conceptual illustration: two spaces for ideas connected by a luminous conversation bridge"
    >
      <svg viewBox="0 0 640 480" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="contact-glow" cx="50%" cy="48%" r="62%">
            <stop offset="0" stopColor="#17498b" stopOpacity=".8" />
            <stop offset=".55" stopColor="#0b2550" stopOpacity=".62" />
            <stop offset="1" stopColor="#06142e" />
          </radialGradient>
          <linearGradient id="contact-left" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#153c76" />
            <stop offset="1" stopColor="#071b3b" />
          </linearGradient>
          <linearGradient id="contact-right" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#17498b" />
            <stop offset="1" stopColor="#0a234d" />
          </linearGradient>
          <linearGradient id="contact-path" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#69b9ef" />
            <stop offset=".47" stopColor="#d6eeff" />
            <stop offset="1" stopColor="#7dc9e8" />
          </linearGradient>
          <filter id="contact-soft-light" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <rect width="640" height="480" fill="url(#contact-glow)" />
        <path
          d="M0 365Q164 312 322 357T640 344M0 397Q180 354 325 403T640 385"
          fill="none" stroke="#2d6198" strokeWidth="1" opacity=".36"
        />
        <g fill="#92c9f4">
          <circle cx="62" cy="77" r="1.2" opacity=".6" />
          <circle cx="111" cy="117" r="1" opacity=".36" />
          <circle cx="213" cy="75" r="1.3" opacity=".43" />
          <circle cx="428" cy="89" r="1" opacity=".5" />
          <circle cx="569" cy="71" r="1.3" opacity=".55" />
          <circle cx="597" cy="146" r="1" opacity=".4" />
        </g>

        {/* The two open architectural spaces represent different perspectives. */}
        <path d="M49 311 185 252 286 307 147 368Z" fill="#0b2a57" stroke="#4e94d4" strokeWidth="2" />
        <path d="M49 311V363l98 56v-51Z" fill="#081c3e" stroke="#3d7db9" strokeWidth="2" />
        <path d="M147 368v51l139-62v-50Z" fill="#0f315f" stroke="#4e94d4" strokeWidth="2" />
        <path d="M83 270 188 225 253 264 147 310Z" fill="url(#contact-left)" stroke="#81bce8" strokeWidth="2" />
        <path d="M83 270v39l64 38v-37Z" fill="#0b2d59" stroke="#81bce8" strokeWidth="2" />
        <path d="M147 310v37l106-45v-38Z" fill="#0e386c" stroke="#81bce8" strokeWidth="2" />
        <path d="m116 271 72-31m-48 44 68-29" fill="none" stroke="#91c8ef" strokeWidth="2" opacity=".68" />

        <path d="m349 311 139-59 104 59-139 65Z" fill="#0a2957" stroke="#4e94d4" strokeWidth="2" />
        <path d="m349 311 104 65v45l-104-60Z" fill="#082041" stroke="#4e94d4" strokeWidth="2" />
        <path d="m453 376 139-65v49l-139 61Z" fill="#103966" stroke="#4e94d4" strokeWidth="2" />
        <path d="m394 265 89-39 70 37-94 43Z" fill="url(#contact-right)" stroke="#91c8ef" strokeWidth="2" />
        <path d="m394 265 65 41v39l-65-37Z" fill="#0c305d" stroke="#91c8ef" strokeWidth="2" />
        <path d="m459 306 94-43v42l-94 40Z" fill="#124175" stroke="#91c8ef" strokeWidth="2" />
        <path d="m429 271 54-23m-30 37 49-22" fill="none" stroke="#b1dbfa" strokeWidth="2" opacity=".75" />

        {/* One exchange creates several constructive possibilities. */}
        <path
          d="M186 226C236 120 273 178 320 162S398 119 483 227"
          fill="none" stroke="#76c5ff" strokeWidth="14" opacity=".23"
          filter="url(#contact-soft-light)"
        />
        <path
          d="M186 226C236 120 273 178 320 162S398 119 483 227"
          fill="none" stroke="url(#contact-path)" strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M320 162Q315 230 381 258M320 162Q344 131 389 139"
          fill="none" stroke="#8dcef6" strokeWidth="1.7"
          strokeLinecap="round" strokeDasharray="4 8" opacity=".85"
        />
        <circle cx="186" cy="226" r="6" fill="#d5efff" />
        <circle cx="320" cy="162" r="11" fill="#a5dbff" opacity=".2" />
        <circle cx="320" cy="162" r="5" fill="#e5f6ff" />
        <circle cx="483" cy="227" r="6" fill="#d5efff" />
        <circle cx="381" cy="258" r="4" fill="#8acaff" />
        <circle cx="389" cy="139" r="4" fill="#8acaff" />
        <path d="M310 151h20m-10-10v20" stroke="#d6efff" strokeWidth="1" opacity=".55" />

        <path d="M115 425Q326 444 528 425" fill="none" stroke="#78b5e2" strokeWidth="1" opacity=".24" />
      </svg>
    </figure>
  );
}
