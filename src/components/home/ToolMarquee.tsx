const tools = [
  { name: "Playwright", src: "/integrations/playwright.svg" },
  { name: "Cypress", src: "/integrations/cypress.svg" },
  { name: "Selenium", src: "/integrations/selenium.svg" },
  { name: "Pytest", src: "/integrations/pytest.svg" },
  { name: "Claude", src: "/agents/claude.svg" },
  { name: "Cursor", src: "/agents/cursor.svg" },
  { name: "OpenCode", src: "/agents/opencode.svg" },
  { name: "Qwen", src: "/agents/qwen.svg" },
];

export function ToolMarquee() {
  const row = [...tools, ...tools];
  return (
    <section className="marquee-band" aria-label="Works with">
      <p>Fits into the stack you already run</p>
      <div className="marquee">
        <div className="marquee-track">
          {row.map((tool, i) => (
            <span className="marquee-item" key={`${tool.name}-${i}`} aria-hidden={i >= tools.length}>
              <img src={tool.src} alt="" width={22} height={22} />
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
