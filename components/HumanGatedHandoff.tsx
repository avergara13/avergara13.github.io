type HandoffProps = { variant?: "light" | "dark" };

const nodes = [
  ["01", "Request + Scope"],
  ["02", "AI-assisted role"],
  ["03", "Specialist work"],
  ["04", "Review + Evidence"],
  ["05", "Human decision"],
  ["06", "Closeout"],
];

export default function HumanGatedHandoff({ variant = "light" }: HandoffProps) {
  return (
    <div className={`handoff handoff-${variant}`} role="group" aria-label="Human-gated handoff">
      <div className="handoff-flow">
        {nodes.map(([number, label], index) => (
          <div className={`handoff-node ${index === 4 ? "handoff-decision" : ""}`} key={number}>
            <span>{number}</span>
            <b>{label}</b>
          </div>
        ))}
      </div>
      <div className="handoff-recovery" role="group" aria-label="Recovery path">
        <span>Recovery</span>
        <b>Review + Evidence</b>
        <span aria-hidden="true">↩ Specialist work</span>
      </div>
      <p className="handoff-note">Closeout follows the human decision.</p>
      <p className="handoff-public-label">SIMPLIFIED PUBLIC-SAFE VIEW</p>
    </div>
  );
}
