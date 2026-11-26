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

export function FailureInvestigationDemo() {
  const [activeTab, setActiveTab] = useState<"overview" | "root" | "repro">("overview");
  const tabs = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "root" as const, label: "Root cause", icon: Search },
    { id: "repro" as const, label: "Reproduction", icon: ListChecks },
  ];
  return <div className="failure-demo-window">
    <div className="failure-demo-topbar"><span><i/><i/><i/></span><b><Bug size={13}/> BUG ANALYSIS / BA-018</b><small>ILLUSTRATIVE REPORT</small></div>
    <div className="failure-demo-content">
      <div className="failure-demo-heading"><div><small>CHECKOUT FLOW · REGRESSION RUN</small><h3>Failure investigation</h3><p>Playwright · Staging environment · Sample data</p></div><span><CircleAlert size={11}/> REVIEW REQUIRED</span></div>
      <div className="failure-demo-tabs" role="tablist" aria-label="Failure investigation views">
        {tabs.map(({id,label,icon:Icon})=><button type="button" role="tab" key={id} aria-selected={activeTab===id} className={activeTab===id?"active":""} onClick={()=>setActiveTab(id)}><Icon size={12}/>{label}</button>)}
      </div>
      {activeTab === "overview" && <div className="failure-demo-panel" role="tabpanel">
        <div className="failure-demo-stats"><div><small>TESTED</small><b>24</b><span>test cases</span></div><div><small>PASSED</small><b className="pass">19</b><span>79.2% success</span></div><div><small>FAILED</small><b className="fail">05</b><span>20.8% failed</span></div><div><small>RISK LEVEL</small><b className="risk">HIGH</b><span>review needed</span></div></div>
        <div className="failure-demo-overview-grid"><section><div className="failure-demo-subhead"><b>Key finding</b><span>01 / 03</span></div><h4>Payment confirmation is not displayed</h4><p>The checkout flow remains on the payment step after submission. The available trace shows that the expected confirmation element was not found.</p><div className="failure-demo-callout"><CircleAlert size={12}/><span><b>Primary concern</b> — The order confirmation may not be rendered after payment submission.</span></div></section><section className="failure-demo-distribution"><div className="failure-demo-subhead"><b>Failure distribution</b><span>5 failures</span></div>{[["Timeout",3,"68%"],["Assertion",1,"42%"],["Network",1,"42%"]].map(([label,count,width])=><div className="failure-demo-bar" key={String(label)}><span>{label}</span><i><b style={{width:String(width)}}/></i><em>{count}</em></div>)}</section></div>
      </div>}
      {activeTab === "root" && <div className="failure-demo-panel failure-demo-root" role="tabpanel">
        <div className="failure-demo-hypothesis"><span><Sparkles size={13}/> AI-GENERATED HYPOTHESIS</span><b>Possible state synchronization issue</b><p>The UI may attempt to display the confirmation view before the order creation response has completed. This could explain why the expected element is missing in the captured result.</p></div>
        <div className="failure-demo-evidence"><b>Evidence to review</b><div><CheckCircle2 size={12}/><span>Assertion output: confirmation element not found</span></div><div><CheckCircle2 size={12}/><span>Execution trace: failure occurs after payment submission</span></div><div><CheckCircle2 size={12}/><span>Related scenario: checkout with valid card details</span></div></div>
        <div className="failure-demo-validation"><ShieldCheck size={13}/><span><b>QA validation required</b> — Inspect the network response, order state, and UI render timing before confirming the cause.</span></div>
      </div>}
      {activeTab === "repro" && <div className="failure-demo-panel failure-demo-repro" role="tabpanel">
        <div className="failure-demo-subhead"><b>Reproduction steps</b><span>Sample scenario · TC-CHK-008</span></div>
        <ol><li><i>01</i><span>Open the checkout page and add an available product to the cart.</span></li><li><i>02</i><span>Continue to payment and enter valid card details in the staging environment.</span></li><li><i>03</i><span>Select <b>Place order</b> and wait for the payment response.</span></li><li><i>04</i><span>Observe whether the order confirmation and order ID are displayed.</span></li></ol>
        <div className="failure-demo-expected"><div><small>EXPECTED RESULT</small><p>Confirmation view appears with the new order ID.</p></div><div><small>OBSERVED IN SAMPLE REPORT</small><p>Confirmation element was not found; checkout remains on the payment step.</p></div></div>
      </div>}
      <div className="failure-demo-footer"><span><ShieldCheck size={11}/> AI findings are suggestions, not confirmed defects.</span><b>QA REVIEW REQUIRED</b></div>
    </div>
  </div>;
}
