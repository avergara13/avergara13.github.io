// TSK-970 — original decorative lattice for the Loft OS flagship stage.
//
// Explanatory diagram LANGUAGE, not evidence: it shows the shape of a governed
// multi-agent workflow (branching specialist paths converging on gated nodes) without
// depicting any real run, telemetry, metric or private runtime surface. It carries no
// numbers and no labels, so it cannot be mistaken for live data.
//
// Decorative, so aria-hidden — the adjacent stage copy carries the meaning.

export function SystemsLattice() {
  return (
    <svg
      className="lattice-art"
      viewBox="0 0 620 460"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="sl-plane" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#e8eefc" stopOpacity="0.9" />
          <stop offset="1" stopColor="#9fb2dd" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* Connective rails — the governed path between stages. */}
      <g stroke="#8fa3d4" strokeWidth="1.2" fill="none" opacity="0.5">
        <path d="M96 150 L236 96 L392 158 L540 104" />
        <path d="M96 150 L236 214 L392 158" />
        <path d="M236 214 L268 300 L420 356" />
        <path d="M392 158 L540 216 L540 104" />
        <path d="M420 356 L540 216" />
      </g>
      <g stroke="#8fa3d4" strokeWidth="1" fill="none" opacity="0.22">
        <path d="M40 250 L620 108" />
        <path d="M40 330 L620 196" />
      </g>

      {/* Stage plates. */}
      <g>
        <polygon points="236,76 282,96 236,116 190,96" fill="url(#sl-plane)" />
        <polygon points="392,138 438,158 392,178 346,158" fill="url(#sl-plane)" />
        <polygon points="540,84 586,104 540,124 494,104" fill="url(#sl-plane)" />
        <polygon points="236,194 282,214 236,234 190,214" fill="url(#sl-plane)" />
        <polygon points="540,196 586,216 540,236 494,216" fill="url(#sl-plane)" />
        <polygon points="96,130 142,150 96,170 50,150" fill="url(#sl-plane)" />
      </g>

      {/* The human decision node — the one gate that is not automated, marked in copper. */}
      <polygon points="420,334 470,356 420,378 370,356" fill="#d9772c" opacity="0.92" />
      <polygon
        points="420,326 478,356 420,386 362,356"
        fill="none"
        stroke="#e8934a"
        strokeWidth="1"
        opacity="0.55"
      />
      <circle cx="268" cy="300" r="5" fill="#e8934a" opacity="0.85" />
    </svg>
  );
}
