"use client";

import { useEffect, useRef, useState } from "react";

type WorkItem = { action: string; estimate?: string; state?: string };
type Blocker = { blocking: string; blocked: string; unlock: string };
type Mission = {
  nextAction: WorkItem & { inferred?: boolean };
  outcomes: string[];
  today: WorkItem[];
  blockers: Blocker[];
  deferred: { item: string; reason: string }[];
  humanDecisions?: { context: string; choice: string }[];
  assumptions: string[];
};
type Refinement = {
  constraint: string;
  planning: string;
  assistant: string;
  mission: Mission;
};
type Fixture = {
  label: string;
  input: string;
  summaries: [string, string, string];
  mission: Mission;
  refinementLabels: string[];
  refinements: Record<string, Refinement>;
};

const fixtures: Record<string, Fixture> = {
  overloaded_day: {
    label: "Overloaded Day",
    input: "Need to finish the Q3 presentation today but I only have 3 hours. Also need to reply to that important email from David. Waiting on feedback for the design comps. Should probably go to the gym and get groceries. Oh and maybe I can start brainstorming that new lower-priority marketing idea if I have time.",
    summaries: ["6 items · 1 blocker · 1 constraint", "2 outcomes · 4 ready · 1 deferred", "1 next action · 3 today items"],
    mission: {
      nextAction: { action: "Finish the Q3 presentation", estimate: "~90 min", inferred: true },
      outcomes: ["Deliver Q3 presentation within constrained window", "Clear important communication with David", "Protect essential personal errands if time permits"],
      today: [{ action: "Reply to important email from David" }, { action: "Get groceries", state: "Errand" }],
      blockers: [{ blocking: "Design comps", blocked: "Finalizing related presentation slides", unlock: "Feedback received from reviewer" }],
      deferred: [{ item: "Go to the gym", reason: "Insufficient time within 3-hour constraint" }, { item: "Marketing brainstorm", reason: "Lower priority against hard deadlines" }],
      assumptions: ["Presentation work estimate is approximate based on the 3-hour total constraint."],
    },
    refinementLabels: ["I only have 90 minutes.", "Move nonessential work to tomorrow."],
    refinements: {
      "i only have 90 minutes": {
        constraint: "Only 90 minutes available",
        planning: "2 outcomes · 2 ready · 3 deferred",
        assistant: "1 next action · 2 today items",
        mission: {
          nextAction: { action: "Finish the most important remaining portion of the Q3 presentation", estimate: "~60 min", inferred: true },
          outcomes: ["Make meaningful progress on the Q3 presentation", "Clear the important email from David"],
          today: [{ action: "Q3 presentation", estimate: "~60 min", state: "estimated" }, { action: "Reply to David", estimate: "~15 min", state: "estimated" }],
          blockers: [{ blocking: "Design comps", blocked: "Finalizing related presentation slides", unlock: "Feedback received from reviewer" }],
          deferred: [{ item: "Groceries", reason: "Outside the 90-minute work window" }, { item: "Go to the gym", reason: "Deferred by time constraint" }, { item: "Marketing brainstorm", reason: "Lower priority" }],
          assumptions: [],
        },
      },
      "move nonessential work to tomorrow": {
        constraint: "Move nonessential work to tomorrow",
        planning: "2 outcomes · 3 ready · 2 deferred",
        assistant: "1 next action · 2 today items",
        mission: {
          nextAction: { action: "Continue the Q3 presentation." },
          outcomes: ["Advance the Q3 presentation", "Clear the important email from David"],
          today: [{ action: "Q3 presentation" }, { action: "Reply to David" }],
          blockers: [{ blocking: "Design comps", blocked: "Finalizing related presentation slides", unlock: "Feedback received from reviewer" }],
          deferred: [{ item: "Go to the gym", reason: "Nonessential today" }, { item: "Marketing brainstorm", reason: "Lower priority" }, { item: "Groceries", reason: "Not essential to current work window" }],
          assumptions: [],
        },
      },
    },
  },
  blocked_project: {
    label: "Blocked Project",
    input: "Goal is to ship the website change today. I'm waiting on access approval from IT for the deployment environment. I can do the documentation right now though. Need to also do QA work on the staging link. Unrelated: urgent request from sales to pull a report. And we need to make a decision on the vendor contract.",
    summaries: ["6 items · 1 blocker · 1 decision", "3 outcomes · 3 ready · 2 deferred", "1 next action · 4 today items"],
    mission: {
      nextAction: { action: "Complete documentation for the website change", estimate: "~45 min", inferred: true },
      outcomes: ["Maintain forward momentum while IT access is blocked", "Resolve urgent sales request", "Clear QA staging queue"],
      today: [{ action: "Perform QA work on the staging link" }, { action: "Pull urgent report for sales", state: "Urgent" }],
      blockers: [{ blocking: "IT access approval", blocked: "Website deployment environment", unlock: "Access granted by IT" }],
      deferred: [{ item: "Ship website change", reason: "Blocked on deployment access" }],
      humanDecisions: [{ context: "Vendor contract", choice: "Choose whether contract review remains today or moves after the urgent sales request." }],
      assumptions: ["Documentation can be completed without IT deployment access."],
    },
    refinementLabels: ["This just became urgent.", "I’m waiting on someone for this."],
    refinements: {
      "this just became urgent": {
        constraint: "This just became urgent",
        planning: "3 outcomes · 3 ready · 2 deferred",
        assistant: "1 next action · 4 today items",
        mission: {
          nextAction: { action: "Complete the urgent sales report." },
          outcomes: ["Resolve urgent sales request immediately", "Maintain forward momentum while IT access is blocked", "Clear QA staging queue"],
          today: [{ action: "Complete documentation for the website change" }, { action: "Perform QA work on the staging link" }],
          blockers: [{ blocking: "IT access approval", blocked: "Website deployment environment", unlock: "Access granted by IT" }],
          deferred: [{ item: "Ship website change", reason: "Blocked on deployment access" }],
          humanDecisions: [{ context: "Vendor contract", choice: "Choose whether contract review remains today or moves after the urgent sales request." }],
          assumptions: [],
        },
      },
      "i’m waiting on someone for this": {
        constraint: "I’m waiting on someone for this",
        planning: "3 outcomes · 3 ready · 2 deferred",
        assistant: "1 next action · 3 today items",
        mission: {
          nextAction: { action: "Complete documentation for the website change", estimate: "~45 min", inferred: true },
          outcomes: ["Maintain forward momentum while IT access is blocked", "Resolve urgent sales request"],
          today: [{ action: "Perform QA work on the staging link" }, { action: "Pull urgent report for sales", state: "Urgent" }],
          blockers: [{ blocking: "IT access approval", blocked: "Website deployment environment", unlock: "Access granted by IT" }],
          deferred: [{ item: "Ship website change", reason: "Waiting on someone for deployment access" }],
          humanDecisions: [{ context: "Vendor contract", choice: "Decide priority compared to sales report." }],
          assumptions: ["Waiting work is safely parked until access is granted."],
        },
      },
    },
  },
  brain_dump: {
    label: "Brain Dump",
    input: "Don't forget to renew the software license by Friday. Thinking about how the team structure isn't scaling well... worrying about the Q4 targets. Need the finalized budget before I can hire. Also a note: the coffee machine is broken again.",
    summaries: ["5 items · 1 blocker · 1 deadline", "2 outcomes · 2 ready · 2 deferred", "1 next action · 2 today items"],
    mission: {
      nextAction: { action: "Renew the software license", estimate: "Deadline: Friday" },
      outcomes: ["Secure tooling access before license expiration", "Document organizational and budget constraints"],
      today: [{ action: "Request finalized budget for hiring plan" }],
      blockers: [{ blocking: "Finalized budget", blocked: "Hiring new team members", unlock: "Budget approved and released" }],
      deferred: [{ item: "Team structure scaling", reason: "Requires budget clarity and dedicated planning session" }],
      assumptions: ["Coffee machine note is non-actionable venting.", "Q4 targets worry is logged for context but lacks an immediate action today."],
    },
    refinementLabels: ["I only have 90 minutes.", "Move nonessential work to tomorrow."],
    refinements: {
      "i only have 90 minutes": {
        constraint: "Only 90 minutes available",
        planning: "1 outcome · 1 ready · 3 deferred",
        assistant: "1 next action · 1 today item",
        mission: {
          nextAction: { action: "Renew the software license.", estimate: "Deadline: Friday" },
          outcomes: ["Secure tooling access before license expiration"],
          today: [],
          blockers: [{ blocking: "Finalized budget", blocked: "Hiring new team members", unlock: "Budget approved and released" }],
          deferred: [{ item: "Team structure scaling", reason: "Requires dedicated planning session" }, { item: "Q4 targets planning", reason: "Deferred by 90-minute time constraint" }, { item: "Request finalized budget", reason: "Deferred by 90-minute time constraint" }],
          assumptions: ["Coffee machine note is non-actionable venting — no requested action."],
        },
      },
      "move nonessential work to tomorrow": {
        constraint: "Move nonessential work to tomorrow",
        planning: "2 outcomes · 1 ready · 3 deferred",
        assistant: "1 next action · 1 today item",
        mission: {
          nextAction: { action: "Renew the software license." },
          outcomes: ["Protect deadline-sensitive license work", "Defer exploratory structural planning"],
          today: [],
          blockers: [{ blocking: "Finalized budget", blocked: "Hiring new team members", unlock: "Budget approved and released" }],
          deferred: [{ item: "Team structure scaling", reason: "Exploratory, lower priority" }, { item: "Q4 targets", reason: "Deferred to tomorrow" }, { item: "Request finalized budget", reason: "Deferred to tomorrow" }],
          assumptions: ["Coffee machine note is non-actionable venting — no requested action."],
        },
      },
    },
  },
};

const stageNames = ["Triage Agent", "Planning Agent", "Personal Assistant Agent"];
const stageDescriptions = ["Extract tasks, blockers, decisions, constraints", "Prioritize outcomes, dependencies, and work", "Build the day plan and next action"];

const normalize = (value: string) => value.trim().toLocaleLowerCase().replace(/[.]$/, "");

function MissionView({ mission }: { mission: Mission }) {
  return <div className="relay-plan-body">
    <section><span className="relay-label">Do this next</span><div className="relay-next"><strong>{mission.nextAction.action}</strong>{mission.nextAction.estimate && <small>{mission.nextAction.estimate}{mission.nextAction.inferred ? " · estimated" : ""}</small>}</div></section>
    <section><span className="relay-label">Top outcomes</span><ul>{mission.outcomes.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul></section>
    {mission.today.length > 0 && <section><span className="relay-label">Today</span><ul>{mission.today.map((item) => <li key={item.action}><span>{item.action}</span>{(item.estimate || item.state) && <small>{[item.estimate, item.state].filter(Boolean).join(" · ")}</small>}</li>)}</ul></section>}
    {mission.blockers.length > 0 && <section><span className="relay-label">Blockers</span>{mission.blockers.map((item) => <dl className="relay-blocker" key={item.blocked}><div><dt>Waiting on</dt><dd>{item.blocking}</dd></div><div><dt>Blocks</dt><dd>{item.blocked}</dd></div><div><dt>Unlock</dt><dd>{item.unlock}</dd></div></dl>)}</section>}
    {mission.deferred.length > 0 && <section><span className="relay-label">Deferred</span><ul>{mission.deferred.map((item) => <li key={item.item}><span>{item.item}</span><small>Deferred — {item.reason}</small></li>)}</ul></section>}
    {mission.humanDecisions?.length && <section><span className="relay-label">Human decisions</span>{mission.humanDecisions.map((item) => <div className="relay-human" key={item.context}><b>{item.context}</b><span>{item.choice}</span></div>)}</section>}
    {mission.assumptions.length > 0 && <section><span className="relay-label">Assumptions</span><ul>{mission.assumptions.map((item) => <li key={item}>{item}</li>)}</ul></section>}
  </div>;
}

// Locked TSK-961 Phase 2 lifecycle. Two authority gates are held by parties other than
// the executor: work may not begin, and may not ship, on the executor's own say-so.
const lifecycle: { stage: string; note: string; authority?: boolean }[] = [
  { stage: "Request", note: "Intent enters as a plain request." },
  { stage: "Task", note: "The request becomes a tracked task with an explicit objective." },
  { stage: "Scoped execution", note: "A scoped contract names what may change and what \u201cdone\u201d means, and execution begins only through the required authority path.", authority: true },
  { stage: "Agent work", note: "Assigned agents change only the surfaces the scope allows." },
  { stage: "Independent review", note: "Review and change custody inspect the work before anything ships." },
  { stage: "Protected release", note: "A separate authority decides whether the work merges.", authority: true },
  { stage: "Verified closeout", note: "Closeout is refused if the required evidence is incomplete." },
];

export function DecisionRelay() {
  const [input, setInput] = useState("");
  const [fixtureId, setFixtureId] = useState<string | null>(null);
  const [statuses, setStatuses] = useState(["WAITING", "WAITING", "WAITING"]);
  const [summaries, setSummaries] = useState(["", "", ""]);
  const [mission, setMission] = useState<Mission | null>(null);
  const [warning, setWarning] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [refinement, setRefinement] = useState("");
  const [constraint, setConstraint] = useState("");
  const [revision, setRevision] = useState(0);
  const [running, setRunning] = useState(false);
  const runRef = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => () => { runRef.current += 1; }, []);

  const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
  const reset = () => {
    runRef.current += 1;
    setStatuses(["WAITING", "WAITING", "WAITING"]);
    setSummaries(["", "", ""]);
    setMission(null);
    setWarning("");
    setAnnouncement("Agent Workflow Demo reset.");
    setConstraint("");
    setRefinement("");
    setRevision(0);
    setRunning(false);
  };

  const runStages = async (nextSummaries: string[], startAt = 0) => {
    const runId = ++runRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (let index = startAt; index < 3; index += 1) {
      if (runRef.current !== runId) return false;
      setAnnouncement(`${stageNames[index]} working.`);
      setStatuses((current) => current.map((item, itemIndex) => itemIndex === index ? "WORKING" : item));
      await wait(reduced ? 40 : 420 + (index * 120));
      if (runRef.current !== runId) return false;
      setStatuses((current) => current.map((item, itemIndex) => itemIndex === index ? "VALIDATED" : item));
      setSummaries((current) => current.map((item, itemIndex) => itemIndex === index ? nextSummaries[index] : item));
      setAnnouncement(`${stageNames[index]} validated.`);
    }
    return true;
  };

  const chooseFixture = (id: string) => {
    reset();
    setFixtureId(id);
    setInput(fixtures[id].input);
    window.requestAnimationFrame(() => document.getElementById("relay-input")?.focus());
  };

  const runDemo = async () => {
    if (!fixtureId || input !== fixtures[fixtureId].input) {
      setWarning("Custom input is not processed in this public demo. Choose a curated example to run the demo.");
      setAnnouncement("Custom input is not processed. Choose a curated example.");
      return;
    }
    setWarning("");
    setRunning(true);
    setMission(null);
    setConstraint("");
    setStatuses(["WAITING", "WAITING", "WAITING"]);
    setSummaries(["", "", ""]);
    const fixture = fixtures[fixtureId];
    const completed = await runStages(fixture.summaries);
    if (!completed) return;
    setMission(fixture.mission);
    setRunning(false);
    setAnnouncement("Workflow complete. Your curated demo plan is ready.");
    window.requestAnimationFrame(() => headingRef.current?.focus());
  };

  const applyRefinement = async (value: string = refinement) => {
    if (!fixtureId || !mission) return;
    const normalized = normalize(value);
    if (/^(add |also add|new task|also need to)/.test(normalized)) {
      setWarning("This adds new work and requires a new run. The curated demo will not pretend it was replanned.");
      setAnnouncement("New work requires a new run.");
      return;
    }
    const update = fixtures[fixtureId].refinements[normalized];
    if (!update) {
      setWarning("That refinement is not available in this curated demo. Choose one of the sample refinements.");
      setAnnouncement("Choose a curated refinement.");
      return;
    }
    setWarning("");
    setRunning(true);
    setStatuses((current) => [current[0], "WAITING", "WAITING"]);
    setSummaries((current) => [current[0], "", ""]);
    const completed = await runStages([summaries[0], update.planning, update.assistant], 1);
    if (!completed) return;
    setConstraint(update.constraint);
    setMission(update.mission);
    setRevision((current) => current + 1);
    setRunning(false);
    setAnnouncement("Plan revised. The human constraint is visible in the updated plan.");
    window.requestAnimationFrame(() => headingRef.current?.focus());
  };

  return <section className="relay-section shell" id="decision-relay" aria-labelledby="relay-title">
    <div className="relay-header">
      <p className="relay-eyebrow">Interactive proof</p>
      <div className="relay-title-row"><h2 id="relay-title">Agent Workflow Demo</h2><span>Curated demo</span></div>
      <p>A curated walkthrough of one governed run. See how a request becomes bounded agent work, moves through protected review, and reaches verified closeout.</p>
      <p className="relay-disclosure">Curated demonstration · deterministic fixture · not a live autonomous production run.</p>
    </div>
    <div className="proof-surface relay-chain">
    <ol className="proof-chain" id="governed-run" aria-label="Governed run: request to verified closeout">
      {lifecycle.map((step, index) => (
        <li className={step.authority ? "authority-gate" : ""} key={step.stage}>
          <article>
            <span>{step.authority ? `Stage ${index + 1} \u00b7 Authority gate` : `Stage ${index + 1}`}</span>
            <b>{step.stage}</b>
            <p>{step.note}</p>
          </article>
        </li>
      ))}
    </ol>
    </div>
    <div className="relay-layout">
      <div className="relay-input-panel">
        {/* TSK-970 audit repair B: this used to be an editable textarea, which promised
            that whatever you typed would be processed. It never was — the demo runs
            deterministic fixtures. The chooser now comes first and the example is
            read-only, so the capability is obvious BEFORE the run rather than being
            refused after it. */}
        <span className="relay-label">Choose a curated example</span>
        <div className="relay-samples" role="group" aria-label="Curated examples">{Object.entries(fixtures).map(([id, fixture]) => <button type="button" key={id} aria-pressed={fixtureId === id} onClick={() => chooseFixture(id)} disabled={running}>{fixture.label}</button>)}</div>
        <div className="relay-example" id="relay-input" tabIndex={-1} role="group" aria-label="Selected example input">
          {input ? <p>{input}</p> : <p className="relay-example-empty">No example selected yet. Pick one above to load its input.</p>}
        </div>
        {warning && <p className="relay-warning" aria-live="polite">{warning}</p>}
        <button className="relay-run" type="button" onClick={runDemo} disabled={running || !fixtureId}>{running ? "Relay running…" : "Run demo"}</button>
        <p className="relay-privacy">This demo runs fixed examples only — there is nothing to type, so no personal or confidential text can be entered.</p>
      </div>
      <div className="relay-output">
        <div className="relay-pipeline" role="group" aria-label="Agent Workflow Demo agents">
          {stageNames.map((name, index) => <article className={statuses[index] === "WORKING" ? "is-working" : ""} key={name}>
            <div><span>0{index + 1} {name}</span><b className={`relay-status ${statuses[index].toLowerCase()}`}>{statuses[index]}</b></div>
            {summaries[index] ? <p>{summaries[index]}</p> : <p>{stageDescriptions[index]}</p>}
          </article>)}
        </div>
        <div className={`relay-mission ${mission ? "has-result" : ""}`}>
          {!mission ? <div className="relay-placeholder"><h3>Your prioritized plan will appear here.</h3><div className="relay-skeleton" aria-hidden="true"><span>Do this next</span><i /><span>Top outcomes</span><i className="short" /><i className="short" /><span>Today</span><i /><span>Blockers</span><i /><span>Deferred</span><i /></div></div> : <div>
            <div className="relay-plan-heading"><h3 tabIndex={-1} ref={headingRef}>Prioritized Plan</h3>{revision > 0 && <span>Revised plan · revision {String(revision).padStart(2, "0")}</span>}</div>
            {constraint && <div className="relay-human"><b>Human constraint</b><span>{constraint}</span></div>}
            <MissionView mission={mission} />
            <div className="relay-refinement">
              <p className="relay-label">Refine the plan</p><p>Adjust a constraint without pretending to process new work. These are the refinements this example supports.</p>
              <div className="relay-samples">{fixtureId && fixtures[fixtureId].refinementLabels.map((label) => <button type="button" key={label} aria-pressed={normalize(refinement) === normalize(label)} onClick={() => { setRefinement(label); void applyRefinement(label); }} disabled={running}>{label}</button>)}</div>
              <button className="relay-reset" type="button" onClick={reset}>Reset demo</button>
            </div>
          </div>}
        </div>
      </div>
    </div>
    <p className="relay-governance">Curated fixtures only · React renders escaped text · arbitrary input is never presented as processed · human refinement remains explicit</p>
    <p className="sr-only" aria-live="polite">{announcement}</p>
  </section>;
}
