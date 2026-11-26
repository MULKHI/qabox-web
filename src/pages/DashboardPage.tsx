import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronDown,
  ChevronRight, CircleAlert, Code2, Command, Cpu, Download, ExternalLink,
  FileCode2, Github, Globe2, Layers3, Menu, Monitor, Play, ScanSearch,
  ShieldCheck, Sparkles, Terminal, X, Zap, LayoutDashboard, Folder, ListChecks,
  ClipboardList, Activity, Bot, Plug, Bug, Search, Filter, PanelLeft, Plus, MoreHorizontal,
  CircleCheck, Settings, Bell, UserRound, Pause, MousePointer2, Workflow, Globe, Smartphone, Mail,
} from "lucide-react";
import { Eyebrow, ButtonLink, Brand, SectionHeading } from "../components/shared";
import { PageFrame, Footer } from "../components/layout";
import { API_BASE, getToken, getUser, type User, type AuthResult } from "../lib/auth";
import { faqs } from "../lib/content";

export function DashboardPage({ user, signOut }: { user: User | null; signOut: () => void }) {
  const [showDesktop,setShowDesktop] = useState(true);
  const token = localStorage.getItem("qabox_token") || "";
  return <><header className="site-header"><div className="nav-wrap"><Brand/><div className="nav-actions"><span className="nav-user">{user?.name || user?.email || "QaBox user"}</span><button className="button button-secondary" onClick={signOut}>Sign out</button></div></div></header><main className="dashboard container"><Eyebrow>DASHBOARD</Eyebrow><h1>Welcome to <span className="text-accent">QaBox.</span></h1><p>Your QA workspace is ready. Download the desktop app to get started.</p><div className="dashboard-cards">{[["Scan pages","Capture DOM structure from any live app"],["AI agents","Connect your AI model via MCP integration"],["Test scripts","Generate automation in your preferred framework"]].map(([title,desc])=><div className="dashboard-card" key={title}><span className="badge badge-accent">READY</span><h3>{title}</h3><p>{desc}</p></div>)}</div><div className="dashboard-next"><small>GET STARTED</small><h2>Continue in QaBox Desktop</h2><p>Open your desktop workspace to scan pages, manage test cases, and generate automation.</p><a className="button" href={`qabox://open?token=${encodeURIComponent(token)}`}>Open QaBox Desktop <ExternalLink size={15}/></a></div></main><Footer/>
    {showDesktop && <div className="modal-backdrop" onClick={()=>setShowDesktop(false)}><div className="desktop-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setShowDesktop(false)}><X size={17}/></button><div className="modal-brand"><img src="/qabox-logo.png"/> QaBox Desktop</div><Eyebrow>YOU'RE IN</Eyebrow><h2>Open QaBox Desktop App</h2><p>Your account is ready. Open the desktop app to continue in your local QA workspace.</p><a className="button" href={`qabox://open?token=${encodeURIComponent(token)}`}>Open desktop app <ExternalLink size={15}/></a><button className="text-button" onClick={()=>setShowDesktop(false)}>Continue in browser</button></div></div>}
  </>;
}
