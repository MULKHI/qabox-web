import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ClipboardList, Folder, ListChecks, ScanSearch } from "lucide-react";

const resources = [
  { name: "Test scans", detail: "Captured pages & flows", Icon: ScanSearch, tool: "qabox.list_scans", args: 'project: "customer-portal"', result: "8 scans · 24 components" },
  { name: "Test cases", detail: "Reusable QA scenarios", Icon: ClipboardList, tool: "qabox.get_test_cases", args: 'suite: "checkout"', result: "12 cases · 3 linked scans" },
  { name: "App knowledge", detail: "Selectors, behaviors, APIs", Icon: Folder, tool: "qabox.get_knowledge", args: 'page: "/checkout"', result: "16 behaviors · 4 API calls" },
  { name: "Test runs", detail: "Results & failure evidence", Icon: ListChecks, tool: "qabox.get_runs", args: "limit: 5", result: "19 passed · 5 failed" },
];

const agents = [
  { name: "Claude", logo: "/agents/claude.svg" },
  { name: "Cursor", logo: "/agents/cursor.svg" },
  { name: "OpenCode", logo: "/agents/opencode.svg" },
  { name: "Qwen Code", logo: "/agents/qwen.svg" },
];

type Beam = { d: string; kind: "in" | "out"; index: number };

function curve(x1: number, y1: number, x2: number, y2: number) {
  const bend = (x2 - x1) * 0.5;
  return `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
}

export function AgentConnectionBeam() {
  const stageRef = useRef<HTMLDivElement>(null);
  const resourceRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const agentRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hubRef = useRef<HTMLDivElement>(null);
  const [beams, setBeams] = useState<Beam[]>([]);
  const [resource, setResource] = useState(0);
  const [agent, setAgent] = useState(0);
  const [paused, setPaused] = useState(false);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const update = () => {
      const box = stage.getBoundingClientRect();
      const hub = hubRef.current?.getBoundingClientRect();
      if (!hub) return;
      const hubY = hub.top + hub.height / 2 - box.top;
      const next: Beam[] = [];
      resourceRefs.current.forEach((el, index) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        next.push({ kind: "in", index, d: curve(r.right - box.left, r.top + r.height / 2 - box.top, hub.left - box.left, hubY) });
      });
      agentRefs.current.forEach((el, index) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        next.push({ kind: "out", index, d: curve(hub.right - box.left, hubY, r.left - box.left, r.top + r.height / 2 - box.top) });
      });
      setBeams(next);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setResource((r) => {
        const next = (r + 1) % resources.length;
        if (next === 0) setAgent((a) => (a + 1) % agents.length);
        return next;
      });
    }, 2600);
    return () => window.clearInterval(id);
  }, [paused]);

  const active = resources[resource];

  return (
    <div className="mcpx" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mcpx-stage" ref={stageRef}>
        <svg className="mcpx-lines" aria-hidden="true">
          {beams.map((b) => {
            const on = b.kind === "in" ? b.index === resource : b.index === agent;
            return (
              <g key={`${b.kind}-${b.index}`} className={on ? "is-on" : undefined}>
                <path className="mcpx-track" d={b.d} />
                {on && <path key={`${resource}-${agent}`} className="mcpx-pulse" d={b.d} pathLength={1} />}
              </g>
            );
          })}
        </svg>

        <div className="mcpx-col">
          <span className="mcpx-col-title">Project resources</span>
          {resources.map(({ name, detail, Icon }, i) => (
            <button
              key={name}
              type="button"
              ref={(el) => { resourceRefs.current[i] = el; }}
              className={`mcpx-node${i === resource ? " is-on" : ""}`}
              onClick={() => setResource(i)}
              onFocus={() => setResource(i)}
              aria-pressed={i === resource}
            >
              <span className="mcpx-node-icon"><Icon size={16} aria-hidden="true" /></span>
              <span className="mcpx-node-text"><b>{name}</b><small>{detail}</small></span>
            </button>
          ))}
        </div>

        <div className="mcpx-hub-wrap">
          <div className="mcpx-hub" ref={hubRef}>
            <span className="mcpx-hub-ring" aria-hidden="true" />
            <img src="/qabox-logo.png" alt="" width={36} height={36} />
            <b>QaBox MCP</b>
            <small>localhost · stdio</small>
          </div>
        </div>

        <div className="mcpx-col mcpx-col-right">
          <span className="mcpx-col-title">Your agent</span>
          {agents.map(({ name, logo }, i) => (
            <button
              key={name}
              type="button"
              ref={(el) => { agentRefs.current[i] = el; }}
              className={`mcpx-agent${i === agent ? " is-on" : ""}`}
              onClick={() => setAgent(i)}
              onFocus={() => setAgent(i)}
              aria-pressed={i === agent}
            >
              <span className="mcpx-agent-logo"><img src={logo} alt="" width={18} height={18} /></span>
              <b>{name}</b>
              <span className="mcpx-dot" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="mcpx-log" aria-live="polite">
        <span className="mcpx-log-who">{agents[agent].name}</span>
        <code>
          <span className="mcpx-fn">{active.tool}</span>({active.args})
        </code>
        <span className="mcpx-log-result">→ {active.result}</span>
      </div>
    </div>
  );
}
