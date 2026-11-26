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

export function AiStudioInteractiveDemo() {
  const [activeTab, setActiveTab] = useState<"agent" | "knowledge" | "test">("agent");
  const tabs = [
    { id: "agent" as const, label: "Agent chat", icon: Bot },
    { id: "knowledge" as const, label: "Knowledge", icon: Folder },
    { id: "test" as const, label: "Generated test", icon: Code2 },
  ];
  return <div className="ai-demo-shell">
    <div className="ai-demo-windowbar"><span className="ai-demo-dots"><i/><i/><i/></span><span>qabox / ai-studio / checkout</span><span className="ai-demo-connection"><i/> MCP CONNECTED</span></div>
    <div className="ai-demo-toolbar"><div><span className="ai-demo-project-icon"><Layers3 size={14}/></span><span><b>Customer Portal</b><small>PROJECT WORKSPACE</small></span></div><span className="ai-demo-branch">main</span></div>
    <div className="ai-demo-tabs" role="tablist" aria-label="AI Studio demo views">
      {tabs.map(({id,label,icon:Icon})=><button type="button" role="tab" key={id} aria-selected={activeTab===id} className={activeTab===id?"active":""} onClick={()=>setActiveTab(id)}><Icon size={13}/>{label}</button>)}
    </div>
    <div className="ai-demo-content" role="tabpanel">
      {activeTab==="agent"&&<div className="ai-demo-chat">
        <div className="ai-demo-context-chip"><Folder size={12}/> Checkout · Application Knowledge <span>SELECTED</span></div>
        <div className="ai-demo-message ai-demo-user"><small>YOU</small><p>Create Playwright automation for checkout using the linked test cases and captured application context.</p></div>
        <div className="ai-demo-message ai-demo-assistant"><div className="ai-demo-agent-label"><span><Bot size={13}/></span><b>OpenCode Agent</b><i>USING QABOX MCP</i></div><p>I'll review the checkout page structure and test intent before drafting the spec.</p><div className="ai-demo-tool-list"><span><CheckCircle2 size={12}/> Read Application Knowledge</span><span><CheckCircle2 size={12}/> Retrieved 8 linked test cases</span><span><CheckCircle2 size={12}/> Reviewed selectors and expected results</span></div><div className="ai-demo-draft-result"><FileCode2 size={14}/><span><b>checkout.spec.ts</b><small>Automation draft prepared · review required</small></span><span className="ai-demo-draft-badge">DRAFT</span></div></div>
      </div>}
      {activeTab==="knowledge"&&<div className="ai-demo-knowledge">
        <div className="ai-demo-filetree"><small>APPLICATION KNOWLEDGE</small><div className="selected"><Folder size={12}/> Checkout</div><span><FileCode2 size={11}/> page.snapshot.json</span><span><FileCode2 size={11}/> selectors.json</span><span><FileCode2 size={11}/> behaviors.json</span><span><Folder size={11}/> components</span><span><Folder size={11}/> forms</span><div className="ai-demo-tree-note"><CheckCircle2 size={11}/> Imported to project</div></div>
        <div className="ai-demo-knowledge-detail"><div className="ai-demo-detail-heading"><div><small>CAPTURED PAGE</small><b>Checkout</b></div><span>STRUCTURED DATA</span></div><div className="ai-demo-knowledge-stats"><div><b>08</b><small>Pages</small></div><div><b>24</b><small>Components</small></div><div><b>16</b><small>Behaviors</small></div></div><div className="ai-demo-code-preview"><span>OBSERVED ELEMENTS</span><code><i>button</i> <em>"Place order"</em><br/><i>input</i> <em>"Card number"</em><br/><i>form</i> <em>"Payment details"</em><br/><i>state</i> <em>"Validation error"</em></code></div><p><CheckCircle2 size={12}/> Context is available to the connected agent through supported MCP resources.</p></div>
      </div>}
      {activeTab==="test"&&<div className="ai-demo-codeview">
        <div className="ai-demo-code-header"><span><FileCode2 size={12}/> checkout.spec.ts</span><span>PLAYWRIGHT · TYPESCRIPT</span></div>
        <pre><span className="code-muted">01</span> <i>import</i> {'{'} test, expect {'}'} <i>from</i> <em>'@playwright/test'</em>;{'\n'}<span className="code-muted">02</span>{'\n'}<span className="code-muted">03</span> test(<em>'completes checkout'</em>, <i>async</i> ({'{'} page {'}'}) =&gt; {'{'}{'\n'}<span className="code-muted">04</span>   <i>await</i> page.goto(<em>'/checkout'</em>);{'\n'}<span className="code-muted">05</span>   <i>await</i> page.getByLabel(<em>'Card number'</em>).fill(...);{'\n'}<span className="code-muted">06</span>   <i>await</i> page.getByRole(<em>'button'</em>, {'{'} name: <em>'Place order'</em> {'}'}).click();{'\n'}<span className="code-muted">07</span>   <i>await</i> expect(page.getByText(<em>'Order confirmed'</em>)).toBeVisible();{'\n'}<span className="code-muted">08</span> {'}'});</pre>
        <div className="ai-demo-code-footer"><span><CircleAlert size={12}/> Illustrative draft — selectors and test data need review.</span><span>NOT EXECUTED</span></div>
      </div>}
    </div>
    <div className="ai-demo-bottom"><span><i/> Demo workspace · illustrative data</span><span>AGENT DRAFTS. QA REVIEWS.</span></div>
  </div>;
}
