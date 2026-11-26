const columns = [
  {
    status: "Available",
    tone: "ok",
    items: [
      "Chrome extension: single page, manual record, bounded crawl",
      "Desktop app with Extension Bridge",
      "Android scanning over USB, single and multi-screen",
      "Test cases (AI, manual, import), plans and runs",
      "QaBox MCP server for Claude, Cursor, OpenCode, Qwen Code",
      "Reporters for Playwright, Cypress and Pytest",
    ],
  },
  {
    status: "Experimental",
    tone: "warn",
    items: [
      "AI auto scan driven through MCP",
      "Assisted locator healing with approval",
      "AI bug analysis with JSON, Markdown and PDF export",
    ],
  },
  {
    status: "Planned",
    tone: "muted",
    items: [
      "PRD documents as test context",
      "More QA context sources",
      "Wider automation and agent workflows",
    ],
  },
] as const;

export function Roadmap() {
  return (
    <section className="qx-section" id="roadmap">
      <div className="qx-container">
        <div className="qx-head qx-head-row">
          <div>
            <span className="qx-kicker">Where things stand</span>
            <h2>What works today, and what&apos;s still cooking.</h2>
          </div>
          <p>So you know which parts to rely on now and which ones are still changing.</p>
        </div>
        <div className="rmap">
          {columns.map((c) => (
            <div key={c.status} className={`rmap-col rmap-${c.tone}`}>
              <div className="rmap-head">
                <span className="rmap-dot" aria-hidden="true" />
                <h3>{c.status}</h3>
                <span className="rmap-count">{c.items.length}</span>
              </div>
              <ul>
                {c.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
