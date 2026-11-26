import { useEffect, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";

type Phase = "proposed" | "approved" | "kept";

const followUp = ["Update Application Knowledge", "Verify scan version v14", "Agent refreshes the script", "Run again"];

export function LocatorHealing() {
  const [phase, setPhase] = useState<Phase>("proposed");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase !== "approved") return;
    setProgress(0);
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= followUp.length) {
          window.clearInterval(id);
          return p;
        }
        return p + 1;
      });
    }, 700);
    return () => window.clearInterval(id);
  }, [phase]);

  const passed = phase === "approved" && progress >= followUp.length;

  return (
    <section className="qx-section qx-section-band" id="healing">
      <div className="qx-container split2">
        <div className="split2-copy">
          <span className="qx-kicker">Locator healing · experimental</span>
          <h2>The button moved. The test doesn&apos;t have to break for good.</h2>
          <p>
            When a run fails on a selector, the agent checks the latest scan, compares it with the locator the test
            used and proposes a replacement. You approve it before anything in the project changes.
          </p>
          <ul className="heal-facts">
            <li><b>Evidence first</b><span>The proposal links to the scan and screenshot it came from.</span></li>
            <li><b>Nothing silent</b><span>Rejecting it keeps the current knowledge exactly as it was.</span></li>
          </ul>
        </div>

        <div className="heal" aria-live="polite">
          <div className="heal-head">
            <span className="heal-file">checkout.spec.ts</span>
            <span className={`heal-status ${passed ? "is-ok" : phase === "kept" ? "" : "is-bad"}`}>
              {passed ? "passed" : phase === "kept" ? "unchanged" : "failed · locator"}
            </span>
          </div>

          <div className="heal-error">
            <code>TimeoutError: locator(&apos;#btn-place-order&apos;) not found after 5000ms</code>
          </div>

          <div className="heal-diff" aria-label="Proposed locator change">
            <div className="heal-line is-del"><span aria-hidden="true">-</span><code>page.locator(&apos;#btn-place-order&apos;)</code></div>
            <div className="heal-line is-add"><span aria-hidden="true">+</span><code>page.getByRole(&apos;button&apos;, {"{"} name: &apos;Place order&apos; {"}"})</code></div>
          </div>

          <dl className="heal-meta">
            <div><dt>Source</dt><dd>scan v14 · pages/checkout.json</dd></div>
            <div><dt>Why</dt><dd>id removed in last deploy, role + name stable across 3 scans</dd></div>
          </dl>

          {phase === "proposed" && (
            <div className="heal-actions">
              <button className="heal-btn heal-btn-primary" onClick={() => setPhase("approved")}>
                <Check size={14} aria-hidden="true" /> Approve update
              </button>
              <button className="heal-btn" onClick={() => setPhase("kept")}>
                <X size={14} aria-hidden="true" /> Keep existing
              </button>
            </div>
          )}

          {phase === "approved" && (
            <ol className="heal-steps">
              {followUp.map((s, i) => (
                <li key={s} className={i < progress ? "is-done" : i === progress ? "is-run" : ""}>
                  <span className="heal-step-dot" aria-hidden="true">{i < progress ? <Check size={11} /> : null}</span>
                  {s}
                </li>
              ))}
            </ol>
          )}

          {phase === "kept" && (
            <p className="heal-note">Application Knowledge left as is. The failure stays on the run for a person to look at.</p>
          )}

          {(passed || phase === "kept") && (
            <button className="heal-reset" onClick={() => { setPhase("proposed"); setProgress(0); }}>
              <RotateCcw size={13} aria-hidden="true" /> Replay
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
