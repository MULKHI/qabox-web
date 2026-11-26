import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown,
  ChevronRight, CircleAlert, Code2, Command, Cpu, Download, ExternalLink,
  FileCode2, Github, Globe2, Layers3, Menu, Monitor, Play, ScanSearch,
  ShieldCheck, Sparkles, Terminal, X, Zap, LayoutDashboard, Folder, ListChecks,
  ClipboardList, Activity, Bot, Plug, Bug, Search, Filter, PanelLeft, Plus, MoreHorizontal,
  CircleCheck, Settings, Bell, UserRound, Pause, MousePointer2, Workflow, Globe, Smartphone, Mail,
} from "lucide-react";
import { Eyebrow, ButtonLink, Brand, SectionHeading, asset } from "../shared";

export function AgentConnectionBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const resourceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hubRef = useRef<HTMLDivElement>(null);
  const agentGroupRef = useRef<HTMLDivElement>(null);
  const [beamPaths, setBeamPaths] = useState<string[]>([]);

  const resources = [
    { name: "Test Scans", detail: "Captured app flows", Icon: ScanSearch },
    { name: "Test Cases", detail: "Reusable QA scenarios", Icon: ClipboardList },
    { name: "Application Knowledge", detail: "Project context & evidence", Icon: Folder },
    { name: "Docs App", detail: "Desktop workspace", Icon: Monitor },
  ];
  const agents = [
    { name: "Qwen Code", logo: "/agents/qwen.svg" },
    { name: "OpenCode", logo: "/agents/opencode.svg" },
    { name: "Claude", logo: "/agents/claude.svg" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const bounds = container.getBoundingClientRect();
      const point = (el: HTMLDivElement | null, side: "left" | "right") => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: (side === "right" ? r.right : r.left) - bounds.left, y: r.top + r.height / 2 - bounds.top };
      };
      const hubIn = point(hubRef.current, "left");
      const hubOut = point(hubRef.current, "right");
      const paths: string[] = [];
      resourceRefs.current.forEach((node) => {
        const from = point(node, "right");
        if (!from || !hubIn) return;
        const bend = Math.max(38, (hubIn.x - from.x) * .48);
        paths.push(`M ${from.x} ${from.y} C ${from.x + bend} ${from.y}, ${hubIn.x - bend} ${hubIn.y}, ${hubIn.x} ${hubIn.y}`);
      });
      const agent = point(agentGroupRef.current, "left");
      if (hubOut && agent) {
        const bend = Math.max(38, (agent.x - hubOut.x) * .48);
        paths.push(`M ${hubOut.x} ${hubOut.y} C ${hubOut.x + bend} ${hubOut.y}, ${agent.x - bend} ${agent.y}, ${agent.x} ${agent.y}`);
      }
      setBeamPaths(paths);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    [...resourceRefs.current, hubRef.current, agentGroupRef.current].forEach(el => el && observer.observe(el));
    window.addEventListener("resize", update);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  return <div className="agent-beam agent-beam-flow" ref={containerRef} aria-label="QaBox QA resources connect through QaBox MCP to a selected AI agent">
    <svg className="agent-beam-lines" aria-hidden="true">
      <defs><linearGradient id="qabox-mcp-beam" x1="0" x2="1"><stop offset="0%" stopColor="#64748b" stopOpacity=".15"/><stop offset="52%" stopColor="#38bdf8" stopOpacity=".8"/><stop offset="100%" stopColor="#64748b" stopOpacity=".2"/></linearGradient></defs>
      {beamPaths.map((d, i) => <g key={i}><path className="agent-beam-track" d={d}/><path className="agent-beam-pulse" d={d} style={{ animationDelay: `${i * -.65}s` }}/></g>)}
    </svg>
    <div className="agent-beam-column agent-beam-resources">
      <div className="agent-beam-column-title">QABOX QA RESOURCES</div>
      {resources.map(({ name, detail, Icon }, i) => <div className="agent-beam-node agent-beam-resource" key={name} ref={el => { resourceRefs.current[i] = el; }}>
        <span className="agent-beam-resource-icon"><Icon size={17}/></span>
        <span className="agent-beam-label"><b>{name}</b><small>{detail}</small></span>
      </div>)}
    </div>
    <div className="agent-beam-hub" ref={hubRef}>
      <span className="agent-beam-hub-logo"><img src="/qabox-logo.png" alt="" /></span>
      <b>QaBox MCP</b>
      <small>TOOLS &amp; CONTEXT</small>
    </div>
    <div className="agent-beam-column agent-beam-agents">
      <div className="agent-beam-column-title">YOUR AI AGENT</div>
      <div className="agent-beam-agent-list" ref={agentGroupRef}>
        {agents.map(({ name, logo }) => <div className="agent-beam-agent-option" key={name}>
          <span className="agent-beam-logo"><img src={logo} alt="" /></span><b>{name}</b>
        </div>)}
        <span className="agent-beam-agent-note">Choose the agent you already use</span>
      </div>
    </div>
  </div>;
}
