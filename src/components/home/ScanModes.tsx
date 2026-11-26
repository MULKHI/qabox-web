import { useEffect, useState } from "react";
import { Bot, FileSearch, MousePointerClick, Network, RotateCw, Check } from "lucide-react";

type Mode = {
  id: string;
  name: string;
  icon: typeof Bot;
  tagline: string;
  body: string;
  steps: string[];
  loop?: string;
  needsBridge?: boolean;
  captures: string[];
};

const modes: Mode[] = [
  {
    id: "single",
    name: "Single page",
    icon: FileSearch,
    tagline: "One page, read properly.",
    body: "Point it at the page you're on. QaBox reads the DOM, the selectors, the components in each state and the validation on every form field.",
    steps: ["Inspect page", "DOM + selectors", "Components & states", "Forms & FE validation", "Navigation metadata"],
    captures: ["pages/checkout.json", "selectors · 42", "forms · 2 with rules"],
  },
  {
    id: "record",
    name: "Manual record",
    icon: MousePointerClick,
    tagline: "You click, it takes notes.",
    body: "Walk through a flow the way a user would. Each click, input and route change is stored with the element it hit and what changed after.",
    steps: ["Start recording", "Capture interactions", "Selector evidence", "Events & route changes"],
    captures: ["flows/apply-coupon.json", "7 steps recorded", "2 route changes"],
  },
  {
    id: "crawl",
    name: "Bounded auto crawl",
    icon: Network,
    tagline: "Every page inside the fence.",
    body: "Follows same-app links from where you start, builds a queue and inspects each page until it hits the depth and page limits you set.",
    steps: ["Discover same-app links", "Build queue", "Inspect interactions", "Capture state evidence"],
    loop: "Next page while under limit",
    captures: ["18 pages queued", "limit · depth 3", "external links skipped"],
  },
  {
    id: "ai",
    name: "AI auto scan",
    icon: Bot,
    tagline: "Your agent drives, you approve.",
    body: "An MCP agent asks the extension to open menus, submit forms and follow links. Each action is approved and sent back as structured observations.",
    steps: ["Register tab", "Approved browser action", "DOM, a11y & selectors", "Fetch / XHR metadata", "Modals, alerts, menus"],
    loop: "Agent requests the next task",
    needsBridge: true,
    captures: ["api/observed · 11 calls", "modals · 3", "submenus discovered · 6"],
  },
];

export function ScanModes() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const mode = modes[active];

  useEffect(() => {
    setStep(0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(mode.steps.length);
      return;
    }
    const id = window.setInterval(() => {
      setStep((s) => (s > mode.steps.length + 2 ? 0 : s + 1));
    }, 650);
    return () => window.clearInterval(id);
  }, [active, mode.steps.length]);

  const done = step >= mode.steps.length;

  return (
    <section className="qx-section" id="scan-modes">
      <div className="qx-container">
        <div className="qx-head qx-head-row">
          <div>
            <span className="qx-kicker">Chrome extension</span>
            <h2>Four ways to scan, depending on how much you want to click.</h2>
          </div>
          <p>Each mode ends up in the same Application Knowledge bundle, so whichever one you use, the agent reads the same format.</p>
        </div>

        <div className="scm">
          <div className="scm-tabs" role="tablist" aria-label="Scan mode">
            {modes.map((m, i) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  role="tab"
                  id={`scm-tab-${m.id}`}
                  aria-selected={i === active}
                  aria-controls="scm-panel"
                  className={`scm-tab${i === active ? " is-on" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className="scm-tab-icon"><Icon size={16} aria-hidden="true" /></span>
                  <span className="scm-tab-text">
                    <b>{m.name}</b>
                    <small>{m.tagline}</small>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="scm-panel" role="tabpanel" id="scm-panel" aria-labelledby={`scm-tab-${mode.id}`}>
            <p className="scm-body">{mode.body}</p>

            {mode.needsBridge && (
              <div className="scm-bridge">
                <span className="scm-bridge-dot" aria-hidden="true" />
                Desktop Bridge connected · tab registered
              </div>
            )}

            <ol className="scm-steps">
              {mode.steps.map((s, i) => (
                <li key={s} className={i < step ? "is-done" : i === step ? "is-run" : ""}>
                  <span className="scm-step-mark" aria-hidden="true">
                    {i < step ? <Check size={12} /> : String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </li>
              ))}
            </ol>

            {mode.loop && (
              <div className={`scm-loop${done ? " is-on" : ""}`}>
                <RotateCw size={13} aria-hidden="true" /> {mode.loop}
              </div>
            )}

            <div className={`scm-out${done ? " is-on" : ""}`}>
              <span className="scm-out-label">Application scan data</span>
              <div className="scm-out-items">
                {mode.captures.map((c) => <code key={c}>{c}</code>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
