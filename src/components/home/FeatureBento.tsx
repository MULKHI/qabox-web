import { useState, type MouseEvent, type ReactNode } from "react";
import { HardDrive, Smartphone, Usb, Users } from "lucide-react";

function SpotlightCard({ className = "", children }: { className?: string; children: ReactNode }) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return <article className={`bento-card ${className}`} onMouseMove={onMove}>{children}</article>;
}

const reporters = {
  Playwright: `// playwright.config.ts
reporter: [
  ["list"],
  ["playwright-qabox-reporter", { project: "customer-portal" }],
]`,
  Cypress: `// cypress.config.js
reporter: "cypress-qabox-reporter",
reporterOptions: { project: "customer-portal" },`,
  Pytest: `# pytest.ini
[pytest]
addopts = -p pytest_qabox --qabox-project customer-portal`,
};

function ReporterCard() {
  const [tab, setTab] = useState<keyof typeof reporters>("Playwright");
  return (
    <SpotlightCard className="bento-wide">
      <div className="bento-copy">
        <h3>Results come back to where the test was designed</h3>
        <p>Reporter adapters push each run, with evidence, into the project. No dashboard tab to keep open.</p>
      </div>
      <div className="bento-code">
        <div className="bento-tabs" role="tablist" aria-label="Test runner">
          {(Object.keys(reporters) as (keyof typeof reporters)[]).map((k) => (
            <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "is-active" : ""} onClick={() => setTab(k)}>{k}</button>
          ))}
        </div>
        <pre><code>{reporters[tab]}</code></pre>
      </div>
    </SpotlightCard>
  );
}

export function FeatureBento() {
  return (
    <section className="qx-section qx-section-tight">
      <div className="qx-container">
        <div className="qx-head qx-head-row">
          <div>
            <span className="qx-kicker">What else is in the box</span>
            <h2>The boring parts, handled.</h2>
          </div>
          <p>The pieces QA teams usually glue together with spreadsheets and Slack threads.</p>
        </div>
        <div className="bento">
          <SpotlightCard className="bento-tall">
            <div className="bento-icon"><Smartphone size={18} aria-hidden="true" /></div>
            <h3>Android, over a cable</h3>
            <p>Plug in a device, enable USB debugging, and scan screens the same way you scan web pages.</p>
            <div className="bento-phone" aria-hidden="true">
              <div className="bento-phone-screen">
                <span className="bp-bar" />
                <span className="bp-card is-hit" />
                <span className="bp-card" />
                <span className="bp-row"><i /><i /></span>
                <span className="bp-btn" />
              </div>
              <span className="bento-usb"><Usb size={13} /> adb · Pixel 8</span>
            </div>
          </SpotlightCard>

          <ReporterCard />

          <SpotlightCard>
            <div className="bento-icon"><HardDrive size={18} aria-hidden="true" /></div>
            <h3>Local first</h3>
            <p>Scans and projects live on your machine. The MCP server runs locally too, so your staging data stays where it is.</p>
          </SpotlightCard>

          <SpotlightCard>
            <div className="bento-icon"><Users size={18} aria-hidden="true" /></div>
            <h3>Shared projects</h3>
            <p>Invite the team to one project, keep scans, cases and runs in sync, and stop asking who has the latest JSON.</p>
            <div className="bento-avatars" aria-hidden="true">
              <span>DA</span><span>RK</span><span>MF</span><span>+4</span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
