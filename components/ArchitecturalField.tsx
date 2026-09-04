// TSK-970 — original, project-owned decorative architectural abstraction.
//
// This replaces the Canva concept photograph: EA unlocked the asset on condition that
// the locked asymmetric spatial role is preserved WITHOUT shipping a third-party
// building image. Every plane, line and node below is authored here, so the portfolio
// carries no external stock or unresolved licence dependency.
//
// It is DECORATIVE and non-evidentiary — the adjacent HOME copy carries the meaning —
// so it is aria-hidden and contributes no accessible name. It must never be given
// meaning-bearing alt text, and it must never imply a real building, client or project.
//
// Character (per the EA lock): pale-stone cantilevered planes, deep navy recesses, a
// restrained copper soffit and node detail, and a technical-line / systems-grid language
// in the lower field that visually hands off into the Loft OS navy stage.
//
// Crop is controlled entirely by CSS (.arch-field in globals.css) rather than by
// preserveAspectRatio, so each breakpoint can bias the framing independently: the mass
// sits upper-right on desktop and becomes a lower-right spatial field on phones.

export function ArchitecturalField() {
  return (
    <svg
      className="arch-art"
      viewBox="0 0 900 820"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="af-face" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#fdfcfa" />
          <stop offset="1" stopColor="#e4dfd7" />
        </linearGradient>
        <linearGradient id="af-side" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#d8d2c8" />
          <stop offset="1" stopColor="#bdb6aa" />
        </linearGradient>
        <linearGradient id="af-top" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#efeae2" />
        </linearGradient>
        <linearGradient id="af-recess" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1228" />
          <stop offset="1" stopColor="#141d38" />
        </linearGradient>
        <linearGradient id="af-soffit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b45309" />
          <stop offset="0.55" stopColor="#d9772c" />
          <stop offset="1" stopColor="#8a3f07" />
        </linearGradient>
        <linearGradient id="af-deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e1836" />
          <stop offset="1" stopColor="#080f22" />
        </linearGradient>
      </defs>

      {/* Technical construction lines — drawn first so the masses sit on top of them. */}
      <g stroke="#0b1220" strokeWidth="1" fill="none" opacity="0.16">
        <path d="M0 214 H900" />
        <path d="M0 470 H900" />
        <path d="M362 0 V820" />
        <path d="M646 0 V820" />
        <path d="M120 92 L900 40" />
        <path d="M120 640 L900 560" />
      </g>

      {/* Upper cantilever — the dominant mass, projecting left over the void. */}
      <polygon points="362,150 900,96 900,158 428,214" fill="url(#af-top)" />
      <polygon points="362,150 428,214 428,318 362,258" fill="url(#af-side)" />
      <polygon points="428,214 900,158 900,300 428,318" fill="url(#af-face)" />

      {/* The recess it casts, and the copper soffit that lights its underside. */}
      <polygon points="428,318 900,300 900,318 428,338" fill="url(#af-soffit)" />
      <polygon points="428,338 900,318 900,432 428,452" fill="url(#af-recess)" />
      <polygon points="362,258 428,318 428,452 362,392" fill="#0a1228" opacity="0.92" />

      {/* Lower volume — stepped back and to the right, holding the composition down. */}
      <polygon points="486,404 900,372 900,414 540,448" fill="url(#af-top)" />
      <polygon points="486,404 540,448 540,556 486,514" fill="url(#af-side)" />
      <polygon points="540,448 900,414 900,540 540,556" fill="url(#af-face)" />

      {/* Deep field: the navy base that hands off into the Loft OS stage. */}
      <polygon points="0,556 900,516 900,820 0,820" fill="url(#af-deep)" />

      {/* Systems-grid lattice in the deep field — the visual bridge to Loft OS. */}
      <g stroke="#8fa3d4" strokeWidth="1" fill="none" opacity="0.34">
        <path d="M212 700 L360 654 L536 706 L700 646" />
        <path d="M360 654 L392 592" />
        <path d="M536 706 L588 772" />
        <path d="M700 646 L742 704" />
        <path d="M212 700 L268 764" />
      </g>
      <g fill="#dfe6f5" opacity="0.5">
        <polygon points="360,640 386,654 360,668 334,654" />
        <polygon points="536,692 562,706 536,720 510,706" />
        <polygon points="700,632 726,646 700,660 674,646" />
        <polygon points="392,578 414,590 392,602 370,590" />
      </g>

      {/* Restrained copper nodes — the only saturated accent, used twice. */}
      <circle cx="428" cy="328" r="9" fill="#d9772c" />
      <circle cx="428" cy="328" r="17" fill="none" stroke="#d9772c" strokeWidth="1" opacity="0.42" />
      <circle cx="588" cy="772" r="6" fill="#e8934a" opacity="0.9" />
    </svg>
  );
}
