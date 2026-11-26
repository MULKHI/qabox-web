import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, FileJson, Folder, MousePointer2, Play, Radio, ScanLine, Workflow, XCircle } from "lucide-react";

const steps = [
  { title: "Capture", body: "Open the Chrome extension on the page you're testing. Scan one page, record a flow by hand, or let a bounded crawl walk the app." },
  { title: "Import", body: "Desktop picks up the bundle over the local bridge. You choose the project and folder, so nothing lands somewhere by surprise." },
  { title: "Design", body: "Write cases yourself, import JSON, or draft them with AI from the captured flows. Every case links back to the evidence." },
  { title: "Generate", body: "Point Claude, Cursor or OpenCode at the QaBox MCP server. The agent reads the project's context before it writes a line." },
  { title: "Run & review", body: "Reporters send results back to the project. Failed runs come with logs, screenshots and a first pass at the root cause." },
];

const DURATION = 6000;

function CaptureVisual() {
  const modes = [
    { icon: ScanLine, label: "Single page", hint: "DOM, selectors, metadata" },
    { icon: MousePointer2, label: "Manual record", hint: "Your clicks, in order" },
    { icon: Workflow, label: "Auto crawl", hint: "Bounded to one origin" },
    { icon: Radio, label: "AI auto scan", hint: "Agent drives, extension acts" },
  ];
  return (
    <div className="vis-ext">
      <div className="vis-ext-head"><img src="/qabox-logo.png" alt="" width={16} height={16} /> QaBox <span>connected</span></div>
      {modes.map((m, i) => (
        <motion.div key={m.label} className={`vis-ext-mode${i === 1 ? " is-on" : ""}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
          <m.icon size={15} aria-hidden="true" />
          <div><b>{m.label}</b><small>{m.hint}</small></div>
        </motion.div>
      ))}
      <div className="vis-ext-rec"><i /> Recording · 7 steps</div>
    </div>
  );
}

function ImportVisual() {
  return (
    <div className="vis-import">
      <motion.div className="vis-file" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <FileJson size={18} aria-hidden="true" />
        <div><b>checkout-flow.qabox</b><small>8 pages · 64 elements · 12 requests</small></div>
      </motion.div>
      <motion.div className="vis-arrow" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2 }} />
      <motion.ul className="vis-tree" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
        <li><Folder size={14} aria-hidden="true" /> Customer Portal</li>
        <li className="ind"><Folder size={14} aria-hidden="true" /> Scans</li>
        <li className="ind2 is-new"><Folder size={14} aria-hidden="true" /> checkout-flow <em>new</em></li>
        <li className="ind"><Folder size={14} aria-hidden="true" /> Test cases</li>
      </motion.ul>
    </div>
  );
}

function DesignVisual() {
  const lines = [
    ["Given", "a cart with 2 items"],
    ["When", 'I apply coupon "WELCOME10"'],
    ["Then", "the total drops by 10%"],
    ["And", "Place order stays enabled"],
  ];
  return (
    <div className="vis-case">
      <div className="vis-case-head"><b>TC-042</b> Apply a valid coupon at checkout <span>High</span></div>
      {lines.map(([k, v], i) => (
        <motion.div key={k} className="vis-case-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.12 }}>
          <em>{k}</em> {v}
        </motion.div>
      ))}
      <div className="vis-case-foot">Linked: <code>#coupon-code</code> <code>POST /api/cart/coupon</code></div>
    </div>
  );
}

function GenerateVisual() {
  const lines = [
    { c: "you", t: "write a playwright test for TC-042" },
    { c: "tool", t: "qabox.get_test_case(\"TC-042\")" },
    { c: "tool", t: "qabox.get_knowledge(\"checkout-flow\")" },
    { c: "ok", t: "using 5 selectors · 1 API route" },
    { c: "code", t: "await page.fill('#coupon-code', 'WELCOME10')" },
    { c: "code", t: "await expect(total).toHaveText('$75.60')" },
  ];
  return (
    <div className="vis-term">
      <div className="vis-term-head"><i /><i /><i /> claude · qabox-mcp</div>
      {lines.map((l, i) => (
        <motion.div key={i} className={`vis-term-line ${l.c}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.28 }}>
          {l.c === "you" ? "> " : l.c === "tool" ? "↳ " : l.c === "ok" ? "✓ " : "  "}{l.t}
        </motion.div>
      ))}
    </div>
  );
}

function RunVisual() {
  const rows = [
    { ok: true, name: "Apply a valid coupon", time: "2.1s" },
    { ok: true, name: "Reject an expired coupon", time: "1.8s" },
    { ok: false, name: "Express shipping updates total", time: "4.6s" },
    { ok: true, name: "Guest checkout with email", time: "3.0s" },
  ];
  return (
    <div className="vis-run">
      <div className="vis-run-head"><Play size={13} aria-hidden="true" /> checkout.spec.ts <span>3 passed · 1 failed</span></div>
      {rows.map((r, i) => (
        <motion.div key={r.name} className={`vis-run-row${r.ok ? "" : " is-fail"}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          {r.ok ? <CheckCircle2 size={14} aria-hidden="true" /> : <XCircle size={14} aria-hidden="true" />} {r.name} <small>{r.time}</small>
        </motion.div>
      ))}
      <motion.div className="vis-run-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
        Likely cause: total re-renders after the shipping request resolves. Wait on <code>/api/shipping</code> before asserting.
      </motion.div>
    </div>
  );
}

const visuals = [CaptureVisual, ImportVisual, DesignVisual, GenerateVisual, RunVisual];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), DURATION);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  const Visual = visuals[active];

  return (
    <section className="qx-section" id="how-it-works">
      <div className="qx-container">
        <div className="qx-head">
          <span className="qx-kicker">How it works</span>
          <h2>From a live page to a passing test,<br />without the copy-paste in between.</h2>
        </div>
        <div className="flow" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <ol className="flow-steps" role="tablist" aria-label="Workflow steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  role="tab"
                  id={`flow-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls="flow-panel"
                  className={active === i ? "is-active" : ""}
                  onClick={() => setActive(i)}
                >
                  <span className="flow-num">{i + 1}</span>
                  <span className="flow-text">
                    <b>{s.title}</b>
                    <span className="flow-body">{s.body}</span>
                  </span>
                  {active === i && (
                    <span className="flow-progress" aria-hidden="true">
                      <span key={`${active}-${paused}`} style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? "paused" : "running" }} />
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ol>
          <div className="flow-stage" id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${active}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="flow-stage-inner"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <Visual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
