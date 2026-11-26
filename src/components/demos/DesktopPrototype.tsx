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

export const desktopPreviewFeatures = [
  { id: "scan", label: "Scans", icon: Folder, title: "Scan Manager", description: "Browse scan folders, inspect Application Knowledge packages, and preview captured files.", points: ["Folder-based scan organization", "Application Knowledge imports from Extension", "File details and content preview"] },
  { id: "cases", label: "Test Cases", icon: ListChecks, title: "Test Case Management", description: "Select a Test Suite, search and filter cases, then inspect their priority, severity, status, and automation type.", points: ["Test Suites in the sidebar", "Search and multi-filter controls", "Structured test case table"] },
  { id: "plans", label: "Test Plans", icon: ClipboardList, title: "Test Plan Library", description: "Create reusable collections of test cases across the suites in a project.", points: ["Searchable plan library", "Case counts and update dates", "Plan details with included cases and run history"] },
  { id: "runs", label: "Test Runs", icon: Activity, title: "Test Runner", description: "Create runs, review execution cards, and open detailed run results.", points: ["New Run workflow", "Search and execution filters", "Run status and result summaries"] },
  { id: "studio", label: "AI Studio", icon: Code2, title: "Code Workspace", description: "Work in the built-in editor with a file explorer, editor tabs, and integrated terminal.", points: ["Workspace file tree and code editor", "Terminal and source-control tools", "Optional AI assistant panel"] },
  { id: "bugs", label: "Bug Analysis", icon: Bug, title: "Scan Bug Report", description: "Upload a supported test report, choose its framework, and review previous analyses.", points: ["Framework selection and JSON upload", "Run Bug Analysis action", "Recent analysis history"] },
];

export const desktopNavItems = [
  ["Projects", LayoutDashboard],
  ["Scans", Folder],
  ["Test Cases", ListChecks],
  ["Shared steps", Workflow],
  ["Test Plans", ClipboardList],
  ["Test Runs", Activity],
  ["AI Studio", Bot],
  ["Integration", Plug],
  ["Bug Analysis", Bug],
] as const;

export function DesktopPrototype() {
  const [active, setActive] = useState("scan");
  const selected = desktopPreviewFeatures.find((item) => item.id === active) || desktopPreviewFeatures[0];
  const FeatureIcon = selected.icon;
  const screenTitle = active === "scan" ? "Scans" : active === "cases" ? "Test Cases" : active === "plans" ? "Test Plans" : active === "runs" ? "Test Runs" : active === "studio" ? "AI Studio" : "Bug Analysis";
  const screenSubtitle = active === "scan" ? "Scan Manager" : active === "cases" ? "Test Case Management" : active === "plans" ? "Plan & Organize Test Execution" : active === "runs" ? "Run & Monitor Tests" : active === "studio" ? "VibeQA · Vibe Coding" : "Scan Bug Report";
  return <section className="desktop-showcase section" id="desktop-preview">
    <div className="container">
      <div className="showcase-heading">
        <div><Eyebrow>PRODUCT PREVIEW</Eyebrow><h2>Preview · <span className="text-accent">QaBox Desktop App</span></h2><p>Explore the actual workspace structure: the page header, navigation, suite and folder panels, and the tools used across the QA lifecycle.</p></div>
        <span className="preview-platform"><Monitor size={14}/> DESKTOP WORKSPACE</span>
      </div>
      <div className="product-preview-layout">
        <div className="preview-window">
          {active !== "studio" && <div className="preview-window-bar"><div className="window-dots"><i/><i/><i/></div><span className="desktop-app-title"><img src="/qabox-logo.png" alt=""/> QaBox <small>Desktop</small></span><span className="preview-window-label">SAMPLE PROJECT · UI PREVIEW</span></div>}
          <div className={active === "studio" ? "preview-app-body preview-studio-mode" : "preview-app-body"}>
            {active === "studio" ? <>
              <div className="preview-studio-header"><div><span className="preview-studio-mark"><Sparkles size={16}/></span><div><b>AI Studio <small>CODE WORKSPACE</small></b><em>VibeQA · Vibe Coding</em></div></div><span className="preview-opencode-connected"><span className="opencode-live-dot"/> OpenCode Agent <i>MCP CONNECTED</i></span><button><ArrowLeft size={12}/> Back to Scans</button></div>
              <div className="preview-editor-toolbar"><span><PanelLeft size={12}/> Explorer</span><span><Search size={12}/> Search</span><span><Workflow size={12}/> Source Control</span><span className="active"><Terminal size={12}/> Terminal</span><span className="editor-toolbar-spacer"/><span>⌘ P</span></div>
              <div className="preview-editor-layout"><aside className="preview-file-tree"><small>EXPLORER</small><b><ChevronDown size={11}/> QA PROJECT</b><span><ChevronDown size={11}/> src</span><span className="file-active"><FileCode2 size={11}/> checkout.spec.ts</span><span><FileCode2 size={11}/> login.spec.ts</span><span><FileCode2 size={11}/> payment.helper.ts</span><span><ChevronRight size={11}/> tests</span><span><ChevronRight size={11}/> fixtures</span><span><FileCode2 size={11}/> package.json</span><span><FileCode2 size={11}/> playwright.config.ts</span></aside><div className="preview-code-area"><div className="preview-editor-tabs"><span className="selected"><FileCode2 size={11}/> checkout.spec.ts <i>×</i></span><span><FileCode2 size={10}/> login.spec.ts</span><span><FileCode2 size={10}/> payment.helper.ts</span></div><div className="preview-code-lines">
                <span><i>1</i><code><b>import</b> {'{'} test, expect {'}'} <b>from</b> <em>'@playwright/test'</em>;</code></span>
                <span><i>2</i><code><b>import</b> {'{'} login {'}'} <b>from</b> <em>'./helpers/auth'</em>;</code></span>
                <span><i>3</i><code><b>import</b> {'{'} addToCart {'}'} <b>from</b> <em>'./helpers/cart'</em>;</code></span>
                <span><i>4</i></span>
                <span><i>5</i><code><em>// Checkout regression scenarios</em></code></span>
                <span><i>6</i><code>test.describe(<em>'Checkout flow'</em>, () =&gt; {'{'}</code></span>
                <span><i>7</i><code>  test.beforeEach(<b>async</b> ({'{'} page {'}'}) =&gt; {'{'}</code></span>
                <span><i>8</i><code>    <b>await</b> login(page, <em>'qa.user@example.test'</em>);</code></span>
                <span><i>9</i><code>    <b>await</b> addToCart(page, <em>'SKU-1042'</em>);</code></span>
                <span><i>10</i><code>    <b>await</b> page.goto(<em>'/checkout'</em>);</code></span>
                <span><i>11</i><code>  {'}'});</code></span>
                <span><i>12</i></span>
                <span><i>13</i><code>  test(<em>'completes payment with valid card'</em>, <b>async</b> ({'{'} page {'}'}) =&gt; {'{'}</code></span>
                <span><i>14</i><code>    <b>await</b> page.getByLabel(<em>'Card number'</em>).fill(<em>'4242 4242 4242 4242'</em>);</code></span>
                <span><i>15</i><code>    <b>await</b> page.getByRole(<em>'button'</em>, {'{'} name: <em>'Pay now'</em> {'}'}).click();</code></span>
                <span><i>16</i><code>    <b>await</b> expect(page.getByText(<em>'Order confirmed'</em>)).toBeVisible();</code></span>
                <span><i>17</i><code>  {'}'});</code></span>
                <span><i>18</i><code>{'}'});</code></span>
              </div><div className="preview-editor-breadcrumb"><span>checkout.spec.ts</span><span>TypeScript</span><span>18 lines</span></div></div></div>
              <div className="preview-terminal preview-opencode-terminal">
                <div className="preview-terminal-tabs">
                  <span className="active"><Terminal size={11}/> TERMINAL</span>
                  <span>AGENT SESSION</span>
                  <span>OUTPUT</span>
                  <span className="terminal-actions"><span className="opencode-terminal-badge"><span className="opencode-live-dot"/> OPENCODE</span><MoreHorizontal size={12}/></span>
                </div>
                <div className="opencode-session-heading">
                  <div className="opencode-session-identity"><span className="opencode-brand-icon"><Bot size={12}/></span><span><b>OpenCode</b><small>build agent · qa-project</small></span></div>
                  <span className="opencode-session-status"><span className="opencode-live-dot"/> Connected to QaBox MCP</span>
                </div>
                <div className="opencode-conversation">
                  <div className="opencode-meta-line">SESSION 01 <span>·</span> Claude Sonnet <span>·</span> MCP tools enabled</div>
                  <div className="opencode-message opencode-user-message"><span className="opencode-message-label">YOU</span><p>Buatkan automation testing untuk checkout flow berdasarkan Application Knowledge dan test case yang tersedia.</p></div>
                  <div className="opencode-agent-message"><div className="opencode-agent-heading"><span className="opencode-agent-icon"><Bot size={10}/></span><b>OpenCode</b><span>Thinking</span></div><p>Saya akan membaca konteks aplikasi dan test case melalui QaBox MCP, lalu menyusun Playwright test.</p></div>
                  <div className="opencode-activity-group"><div className="opencode-activity-title">TOOL CALLS <span>2 completed</span></div><div className="opencode-tool-row"><code>qabox.get_application_knowledge</code><span className="opencode-tool-done">✓ completed</span></div><div className="opencode-tool-row"><code>qabox.list_test_cases</code><span className="opencode-tool-done">✓ 8 cases found</span></div></div>
                  <div className="opencode-agent-message opencode-agent-followup"><div className="opencode-agent-heading"><span className="opencode-agent-icon"><Bot size={10}/></span><b>OpenCode</b></div><p>Menemukan alur login, cart, coupon, dan pembayaran. Saya membuat suite checkout dari skenario tersebut.</p></div>
                  <div className="opencode-created-file"><FileCode2 size={12}/><span><b>checkout.spec.ts</b><small>tests/ · Playwright test file</small></span><em>CREATED</em></div>
                  <div className="opencode-result-row"><span className="opencode-result-check"><Check size={10}/></span><span><b>Automation generated & validated</b><small>Playwright execution completed</small></span><strong>4 PASSED</strong><em>6.8s</em></div>
                </div>
                <div className="opencode-input-bar"><span className="opencode-input-prompt">›</span><span>Ask OpenCode to make changes...</span><kbd>↵</kbd></div>
              </div>
              <div className="preview-editor-status"><span>QaBox Workspace</span><span>Ln 7, Col 42&nbsp;&nbsp; UTF-8&nbsp;&nbsp; TypeScript</span></div>
            </> : <>
              <div className="preview-real-header"><div className="preview-real-heading"><span className="preview-real-icon">{active === "scan" ? <Folder size={17}/> : active === "cases" ? <ListChecks size={17}/> : active === "plans" ? <ClipboardList size={17}/> : active === "runs" ? <Activity size={17}/> : <Bug size={17}/>}</span><div><b>{screenTitle}</b><small>{screenSubtitle}</small></div></div><div className="preview-header-actions"><span><Bell size={15}/></span><span><UserRound size={15}/></span></div></div>
              <div className="preview-workspace">
                <aside className="preview-sidebar">
                  <div className="preview-nav-list">{desktopNavItems.map(([name, Icon]) => {
                    const isActive = (active === "scan" && name === "Scans") || (active === "cases" && name === "Test Cases") || (active === "plans" && name === "Test Plans") || (active === "runs" && name === "Test Runs") || (active === "bugs" && name === "Bug Analysis");
                    return <div key={name} className={isActive ? "preview-nav-item active" : name === "Shared steps" ? "preview-nav-item disabled" : "preview-nav-item"}><Icon size={15}/><span>{name}</span></div>;
                  })}</div>
                  {active === "scan" && <div className="preview-sidebar-extra"><small>FOLDERS</small>{["Application Knowledge","Authentication","Checkout","Dashboard"].map((name,i)=><span key={name} className={i===0?"selected":""}><Folder size={12}/>{name}</span>)}</div>}
                  {active === "cases" && <div className="preview-sidebar-extra"><small>TEST SUITES <Plus size={12}/></small>{["Authentication","Checkout","User profile"].map((name,i)=><span key={name} className={i===0?"selected":""}><Folder size={12}/>{name}<i>{[12,8,6][i]}</i></span>)}</div>}
                  <div className="preview-sidebar-bottom"><Settings size={14}/> Settings</div>
                </aside>
                <main className="preview-main">
                  {active === "scan" && <div className="preview-scan-layout"><div className="preview-main-content"><div className="preview-content-heading"><div><h3>Application Knowledge</h3><p>Captured context from your application</p></div><span className="preview-status"><i/> READY</span></div><div className="preview-import-card"><div><Globe size={15}/></div><span><small>APPLICATION MANIFEST</small><b>Customer Portal</b><em>app.customer-portal.dev</em></span><i>v2</i></div><div className="preview-scan-summary"><span><b>08</b><small>Pages</small></span><span><b>24</b><small>Components</small></span><span><b>16</b><small>Behaviors</small></span></div><div className="preview-panel"><div className="preview-panel-heading"><b>Application files</b><span>12 files</span></div>{[["manifest.json","Application manifest","JSON"],["pages/dashboard.json","Page snapshot","JSON"],["pages/checkout.json","Page snapshot","JSON"],["components/payment.json","Component map","JSON"]].map(([file,meta,type])=><div className="preview-file-row" key={file}><FileCode2 size={12}/><span><b>{file}</b><small>{meta}</small></span><em>{type}</em></div>)}</div></div><aside className="preview-file-preview"><div><b>File Preview</b><X size={12}/></div><small>manifest.json</small><pre>{'{\n'}  <i>"application"</i>: <em>"Customer Portal"</em>,{ '\n'}  <i>"pages"</i>: <b>8</b>,{ '\n'}  <i>"components"</i>: <b>24</b>,{ '\n'}  <i>"behaviors"</i>: <b>16</b>{'\n}'}</pre><span><CheckCircle2 size={11}/> Application Knowledge</span></aside></div>}
                  {active === "cases" && <div className="preview-page-content"><div className="preview-content-heading"><div><h3>Authentication</h3><p>12 test cases · showing 8</p></div><span className="preview-primary-action"><Plus size={11}/> Create Case</span></div><div className="preview-search"><Search size={13}/> Search in Authentication...</div><div className="preview-filter-row"><span><Filter size={11}/> Filters</span><i>Priority: All</i><i>Severity: All</i><i>Status: All</i><i>Automation: All</i></div><div className="preview-data-table"><div className="preview-table-head"><span>ID</span><span>Test Title</span><span>Type</span><span>Priority</span><span>Severity</span><span>Status</span><span>Automation</span></div>{[["TC-001","Successful login with valid credentials","Functional","High","Major","ACTIVE","AUTOMATED"],["TC-002","Login fails with invalid password","Functional","High","Major","ACTIVE","AUTOMATED"],["TC-003","Session expires after inactivity","Security","Medium","Minor","ACTIVE","MANUAL"],["TC-004","User can log out successfully","Functional","Medium","Minor","ACTIVE","AUTOMATED"],["TC-005","Required fields show validation errors","Validation","High","Major","ACTIVE","MANUAL"],["TC-006","Password visibility can be toggled","UI","Low","Minor","DRAFT","MANUAL"],["TC-007","Account locks after repeated failures","Security","High","Critical","ACTIVE","AUTOMATED"],["TC-008","Remember me keeps user signed in","Functional","Medium","Major","DRAFT","MANUAL"]].map(row=><div className="preview-table-row" key={row[0]}><b>{row[0]}</b><span>{row[1]}</span><small>{row[2]}</small><em>{row[3]}</em><small>{row[4]}</small><small className={row[5]==="ACTIVE"?"good":"muted"}>{row[5]}</small><small>{row[6]}</small></div>)}</div></div>}
                  {active === "plans" && <div className="preview-page-content"><div className="preview-content-heading"><div><h3>Test Plan Library</h3><p>Create reusable collections of test cases across project suites.</p></div><span className="preview-primary-action"><Plus size={11}/> Create Test Plan</span></div><div className="preview-search"><Search size={13}/> Search test plans...</div><div className="preview-data-table"><div className="preview-table-head plans"><span>Plan</span><span>Test Cases</span><span>Last Updated</span><span>Action</span></div>{[["Sprint 12 Regression","18 cases","Nov 25"],["Checkout Smoke Test","8 cases","Nov 24"],["Authentication Suite","12 cases","Nov 22"]].map(row=><div className="preview-table-row plans" key={row[0]}><span><b>{row[0]}</b><small>Reusable test collection</small></span><small>{row[1]}</small><small>{row[2]}</small><em>View details →</em></div>)}</div></div>}
                  {active === "runs" && <div className="preview-run-detail">
                    <div className="preview-run-breadcrumb"><span>Test Runs</span><ChevronRight size={11}/><b>Checkout regression #RUN-024</b><span className="preview-run-actions"><i>Export JSON</i><i>Export CSV</i></span></div>
                    <div className="preview-run-detail-title"><div><small>TEST RUN · RUN-024</small><h3>Checkout regression</h3><p>Regression suite · Release candidate 1.8.0</p></div><span className="preview-run-status"><i/> COMPLETED</span></div>
                    <div className="preview-run-overview">
                      <section className="preview-run-status-panel"><div className="preview-run-status-top"><span><small>RUN STATUS</small><b><CheckCircle2 size={15}/> COMPLETED</b></span><span><small>DURATION</small><strong>2m 34s</strong></span></div><div className="preview-run-progress"><i/><i/><i/></div><div className="preview-run-metrics"><span><small>Passed</small><b className="pass">11</b></span><span><small>Failed</small><b className="fail">2</b></span><span><small>Skipped</small><b>1</b></span><span><small>Total</small><b>14</b></span></div></section>
                      <section className="preview-run-context"><small>EXECUTION CONTEXT</small><div><span><Code2 size={11}/> Framework</span><b>Playwright</b></div><div><span><Monitor size={11}/> Environment</span><b>Staging</b></div><div><span><Activity size={11}/> Started</span><b>Nov 26 · 14:32</b></div></section>
                    </div>
                    <div className="preview-results-heading"><div><b>Test Results</b><small>14 test cases executed in this run</small></div><span><Search size={11}/> Search results...</span></div>
                    <div className="preview-result-filters"><i className="selected">All (14)</i><i>Passed (11)</i><i className="failed">Failed (2)</i><i>Skipped (1)</i></div>
                    <div className="preview-result-list">
                      <div className="preview-result-item passed"><span className="result-state"><Check size={11}/></span><b>TC-CHK-001</b><span className="result-name">User can add product to cart</span><small>8.4s</small><em>PASSED</em></div>
                      <div className="preview-result-item failed"><span className="result-state"><CircleAlert size={11}/></span><b>TC-CHK-008</b><span className="result-name">Checkout with valid card details</span><small>12.7s</small><em>FAILED</em></div>
                      <div className="preview-result-error"><b><CircleAlert size={10}/> AssertionError</b><span>Expected order confirmation to be visible, but the element was not found.</span></div>
                      <div className="preview-result-item passed"><span className="result-state"><Check size={11}/></span><b>TC-CHK-009</b><span className="result-name">Apply valid discount coupon</span><small>5.2s</small><em>PASSED</em></div>
                      <div className="preview-result-item failed"><span className="result-state"><CircleAlert size={11}/></span><b>TC-CHK-012</b><span className="result-name">Declined payment shows error message</span><small>9.1s</small><em>FAILED</em></div>
                    </div>
                  </div>}
                  {active === "bugs" && <div className="preview-analysis-detail">
                    <div className="preview-analysis-breadcrumb"><span>Bug Analysis</span><ChevronRight size={11}/><b>Executive Summary · BA-018</b><span className="preview-analysis-actions"><i>Export JSON</i><i>Download Report</i></span></div>
                    <div className="preview-analysis-title"><div><small>AI BUG ANALYSIS · BA-018</small><h3>Checkout Flow — Failure Investigation</h3><p>Playwright report · Staging environment · Nov 26, 2026</p></div><span className="preview-analysis-complete"><CheckCircle2 size={11}/> ANALYSIS COMPLETE</span></div>
                    <div className="preview-analysis-metrics">
                      <div><small>TOTAL TESTS</small><b>24</b><span>Test cases analyzed</span></div>
                      <div><small>RISK SCORE</small><b className="risk">HIGH</b><span>Requires attention</span></div>
                      <div><small>PASSED</small><b className="pass">19</b><span>79.2% success rate</span></div>
                      <div><small>FAILED</small><b className="fail">5</b><span>Potential defects found</span></div>
                    </div>
                    <section className="preview-analysis-ai"><div className="preview-analysis-section-title"><span><Sparkles size={12}/></span><b>AI Analysis & Key Findings</b><em>GENERATED INSIGHTS</em></div><p>The checkout flow shows recurring failures during order confirmation. The evidence suggests a possible state synchronization issue after payment submission, causing the confirmation component to render before the order response is available.</p><div className="preview-analysis-insight"><CircleAlert size={11}/><span><b>Primary concern</b> — Order confirmation is intermittently missing after a successful payment response.</span></div></section>
                    <div className="preview-analysis-lower">
                      <section className="preview-analysis-distribution"><div className="preview-analysis-section-title"><b>Failure Distribution</b><small>5 failed tests</small></div><div className="preview-analysis-bar-row"><span>Logic</span><div><i style={{width:"80%"}}/></div><b>4</b></div><div className="preview-analysis-bar-row"><span>Timeout</span><div><i className="timeout" style={{width:"40%"}}/></div><b>2</b></div><div className="preview-analysis-bar-row"><span>Network</span><div><i className="network" style={{width:"20%"}}/></div><b>1</b></div></section>
                      <section className="preview-analysis-summary"><div className="preview-analysis-section-title"><b>Recommended Focus</b></div><ul><li>Verify payment response handling</li><li>Check order confirmation state updates</li><li>Review asynchronous UI rendering</li></ul></section>
                    </div>
                    <section className="preview-analysis-bugs"><div className="preview-analysis-section-title"><b>Identified Bugs</b><small>3 findings · sample report</small></div>
                      <div className="preview-analysis-bug-row"><span>BUG-018</span><div><b>Order confirmation not displayed</b><small>Checkout · Payment success flow</small></div><em className="high">HIGH</em><ChevronRight size={12}/></div>
                      <div className="preview-analysis-bug-detail"><div><b><Sparkles size={10}/> ROOT CAUSE HYPOTHESIS</b><p>UI state may update before the order creation response has completed.</p></div><div><b><Activity size={10}/> REPRODUCTION</b><p>Submit valid card details, wait for payment success, then observe the confirmation view.</p></div><div><b><CheckCircle2 size={10}/> EXPECTED VS ACTUAL</b><p>Expected: confirmation and order ID appear. Actual: confirmation component remains unavailable.</p></div></div>
                      <div className="preview-analysis-bug-row"><span>BUG-019</span><div><b>Discount total not refreshed</b><small>Cart · Coupon recalculation</small></div><em className="medium">MEDIUM</em><ChevronRight size={12}/></div>
                      <div className="preview-analysis-bug-row"><span>BUG-020</span><div><b>Payment error message delayed</b><small>Checkout · Declined payment</small></div><em className="low">LOW</em><ChevronRight size={12}/></div>
                    </section>
                    <div className="preview-analysis-footer"><span>AI-generated findings are suggestions and should be validated by QA.</span><i><Download size={10}/> Export report</i></div>
                  </div>}
                </main>
              </div>
            </>}
          </div>
        </div>
        <aside className="preview-feature-panel">
          <div className="preview-feature-kicker">EXPLORE DESKTOP SCREENS</div>
          <div className="preview-feature-tabs">{desktopPreviewFeatures.map((item,index)=>{const I=item.icon;return <button key={item.id} className={active===item.id?"preview-feature-tab active":"preview-feature-tab"} onClick={()=>setActive(item.id)}><span className="preview-feature-number">0{index+1}</span><I size={16}/><b>{item.label}</b><ChevronRight size={14}/></button>;})}</div>
          <div className="preview-feature-detail" key={selected.id}><span className="preview-feature-icon"><FeatureIcon size={19}/></span><h3>{selected.title}</h3><p>{selected.description}</p><ul>{selected.points.map(point=><li key={point}><CheckCircle2 size={13}/>{point}</li>)}</ul></div>
          <div className="preview-footnote">UI structure follows the current QaBox Desktop FE. Sample names and records are illustrative.</div>
        </aside>
      </div>
    </div>
  </section>;
}
