// Sous Chef — original decorative diagram for the Sous Chef product stage.
//
// The same register as SystemsLattice on the Loft OS stage: explanatory diagram LANGUAGE,
// not evidence. It shows the shape of the product's domain model — pantry state feeding a
// recipe that sits at the centre as the kitchen's source of truth, a prep sequence running
// out of it, one gate that stays human, and a session loop returning to the record — without
// depicting any real screen, recipe, user, or stored data. It carries no numbers and no
// readable labels, so it cannot be mistaken for a screenshot or for live data.
//
// Its palette is the product's own: the warm sunrise and leaf greens of the Sous Chef app
// icon, so the stage reads culinary rather than borrowing the cool navy of the Loft OS
// lattice or the RSP proof surface.
//
// Decorative, so aria-hidden — the adjacent stage copy carries the meaning.

export function KitchenPass() {
  return (
    <svg
      className="pass-art"
      viewBox="0 0 640 600"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="kp-card" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#fffdfa" />
          <stop offset="1" stopColor="#fdf0dd" />
        </linearGradient>
        {/* Radial, so the wash has no edge. A linear gradient on an ellipse left a hard
            disc outline across the middle of the stage. */}
        <radialGradient id="kp-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f2a044" stopOpacity="0.26" />
          <stop offset="0.62" stopColor="#f2a044" stopOpacity="0.10" />
          <stop offset="1" stopColor="#f2a044" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="kp-leaf" x1="0" y1="1" x2="0.7" y2="0">
          <stop offset="0" stopColor="#2f7a34" />
          <stop offset="1" stopColor="#7cb741" />
        </linearGradient>
      </defs>

      <circle cx="330" cy="300" r="285" fill="url(#kp-sun)" />

      {/* Pantry state feeding the recipe. Each rail arrives at its own height on the card's
          edge and stops there — they converged on one point before, which read as a tangle. */}
      <g stroke="#cf8b39" strokeWidth="1.15" fill="none" opacity="0.5">
        <path d="M78 168 C 158 168, 156 214, 220 214" />
        <path d="M78 256 C 152 256, 158 268, 220 268" />
        <path d="M78 344 C 152 344, 158 330, 220 330" />
        <path d="M78 432 C 158 432, 156 388, 220 388" />
      </g>
      <g fill="#e08b33">
        <circle cx="78" cy="168" r="5.5" />
        <circle cx="78" cy="256" r="5.5" />
        <circle cx="78" cy="432" r="5.5" />
      </g>
      {/* One pantry line reads low. A ring, not a number — the product's signals are
          qualitative here on purpose. */}
      <circle cx="78" cy="344" r="5.5" fill="#c0392b" opacity="0.9" />
      <circle cx="78" cy="344" r="12.5" fill="none" stroke="#c0392b" strokeWidth="1.1" opacity="0.5" />

      {/* The recipe: the centre of the diagram, and the source of truth for everything
          around it. Rule lines stand in for structure; none of them is readable text. */}
      <g>
        <rect x="220" y="150" width="216" height="300" rx="18" fill="url(#kp-card)" stroke="#e3b985" strokeWidth="1.4" />

        {/* Identity band. */}
        <rect x="248" y="188" width="92" height="9" rx="4.5" fill="#c2762a" opacity="0.9" />
        <rect x="248" y="210" width="140" height="6" rx="3" fill="#cfa87c" opacity="0.55" />

        {/* Structured ingredient rows: a name on the left, its measure on the right. */}
        <g>
          <g fill="#bd9770" opacity="0.6">
            <rect x="248" y="252" width="74" height="5.5" rx="2.75" />
            <rect x="248" y="278" width="96" height="5.5" rx="2.75" />
            <rect x="248" y="304" width="62" height="5.5" rx="2.75" />
          </g>
          <g fill="#4f9440" opacity="0.62">
            <rect x="378" y="252" width="30" height="5.5" rx="2.75" />
            <rect x="378" y="278" width="30" height="5.5" rx="2.75" />
            <rect x="378" y="304" width="30" height="5.5" rx="2.75" />
          </g>
        </g>

        <line x1="248" y1="336" x2="408" y2="336" stroke="#e3cba9" strokeWidth="1" />

        {/* Method block. */}
        <g fill="#cfa87c" opacity="0.5">
          <rect x="248" y="360" width="160" height="5" rx="2.5" />
          <rect x="248" y="382" width="138" height="5" rx="2.5" />
          <rect x="248" y="404" width="112" height="5" rx="2.5" />
        </g>
      </g>

      {/* The recipe is locked: the clasp on the card, sitting on its top edge. */}
      <g transform="translate(408 150)">
        <circle r="15" fill="#fffdfa" stroke="#e3b985" strokeWidth="1.2" />
        <g transform="translate(0 1)">
          <rect x="-6" y="-1" width="12" height="9" rx="2" fill="#2f7a34" />
          <path d="M-3.2 -1 V -4.2 a 3.2 3.2 0 0 1 6.4 0 V -1" fill="none" stroke="#2f7a34" strokeWidth="1.7" />
        </g>
      </g>

      {/* A garnish, not a houseplant: a small sprig tucked into the card's top-left corner,
          echoing the crown of the app icon without competing with the record. */}
      <g transform="translate(224 152) rotate(-24)" fill="url(#kp-leaf)" opacity="0.9">
        <path d="M0 0 C 14 -10, 32 -9, 44 -2 C 31 7, 12 8, 0 0 Z" />
        <path d="M2 3 C 12 12, 30 18, 43 15 C 35 4, 16 -1, 2 3 Z" opacity="0.72" />
      </g>

      {/* Prep runs out of the record toward service, through one gate that stays human. */}
      <g stroke="#cf8b39" strokeWidth="1.2" fill="none" opacity="0.45">
        <path d="M436 300 H 486" />
        <path d="M522 300 H 552" />
      </g>
      <circle cx="504" cy="300" r="18" fill="none" stroke="#cf8b39" strokeWidth="1.2" opacity="0.55" />
      <circle cx="504" cy="300" r="6" fill="#e08b33" opacity="0.85" />

      <circle cx="574" cy="300" r="21" fill="#d9772c" />
      <circle cx="574" cy="300" r="29" fill="none" stroke="#e8934a" strokeWidth="1.1" opacity="0.5" />

      {/* Session continuity: what was cooked returns to the record and to the pantry. */}
      <path
        d="M574 329 C 574 456, 470 512, 330 512 C 196 512, 104 470, 78 400"
        fill="none"
        stroke="#6faf3f"
        strokeWidth="1.2"
        strokeDasharray="5 7"
        opacity="0.55"
      />
      <circle cx="330" cy="512" r="5.5" fill="#4f9440" opacity="0.8" />
    </svg>
  );
}
