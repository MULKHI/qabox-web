import { ListChecks, Search, ShieldCheck } from "lucide-react";
import { PageFrame } from "../components/layout";
import { Hero } from "../components/home/Hero";
import { ToolMarquee } from "../components/home/ToolMarquee";
import { ProblemReveal } from "../components/home/ProblemReveal";
import { HowItWorks } from "../components/home/HowItWorks";
import { FeatureBento } from "../components/home/FeatureBento";
import { Faq, ClosingCta } from "../components/home/FaqCta";
import { DesktopPrototype } from "../components/demos/DesktopPrototype";
import { FailureInvestigationDemo } from "../components/demos/FailureInvestigationDemo";
import { AgentConnectionBeam } from "../components/demos/AgentConnectionBeam";

export function HomePage() {
  return (
    <PageFrame>
      <main>
        <Hero />
        <ToolMarquee />
        <ProblemReveal />
        <HowItWorks />

        <section className="qx-section qx-section-band" id="product">
          <div className="qx-container">
            <div className="qx-head qx-head-row">
              <div>
                <span className="qx-kicker">The desktop app</span>
                <h2>Click around. It&apos;s the real layout.</h2>
              </div>
              <p>Projects, scans, test cases, runs and AI Studio in one window. The preview below mirrors the Electron app shell.</p>
            </div>
            <DesktopPrototype />
          </div>
        </section>

        <FeatureBento />

        <section className="qx-section" id="bug-analysis">
          <div className="qx-container split2">
            <div className="split2-copy">
              <span className="qx-kicker">Bug analysis</span>
              <h2>A red test is a question, not an answer.</h2>
              <p>
                Feed a failed run into QaBox with its logs, stack trace and screenshots. You get a structured report with
                likely causes and repro steps, and you decide what goes to the developers.
              </p>
              <ul className="ticks">
                <li><Search size={16} aria-hidden="true" /><span><b>Trace it</b> Failed scenarios stay linked to the logs and evidence that explain them.</span></li>
                <li><ListChecks size={16} aria-hidden="true" /><span><b>Read the findings</b> Expected vs. actual, repro steps, and what changed since the last pass.</span></li>
                <li><ShieldCheck size={16} aria-hidden="true" /><span><b>Sign it off</b> Nothing is filed until a person has reviewed it.</span></li>
              </ul>
            </div>
            <FailureInvestigationDemo />
          </div>
        </section>

        <section className="qx-section qx-section-band" id="agents">
          <div className="qx-container split2 split2-rev">
            <div className="split2-copy">
              <span className="qx-kicker">MCP</span>
              <h2>Bring whichever agent you already like.</h2>
              <p>
                QaBox runs a local MCP server. Connect Claude, Cursor, OpenCode or Qwen and the agent can read your
                project&apos;s scans, cases and run history as tools. The extension still does the clicking, so the
                agent never gets a browser of its own.
              </p>
              <a className="qx-link-arrow" href="/docs#automation">Set up an MCP client →</a>
            </div>
            <AgentConnectionBeam />
          </div>
        </section>

        <Faq />
        <ClosingCta />
      </main>
    </PageFrame>
  );
}
