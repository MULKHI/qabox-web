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
import { PageFrame } from "../components/layout";
import { API_BASE, getToken, getUser, type User, type AuthResult } from "../lib/auth";
import { faqs } from "../lib/content";

export const proFeatures = ["Browser Extension + Desktop Bridge workflow","Web and Android scanning","Scan Management","Manual and AI-assisted test cases","JSON test case import","AI Studio and local MCP tools","Automation and Reporter workflow","Reports and bug analysis"];
export const enterpriseFeatures = ["Team and multi-user workflows","Shared project context","Deployment and integration requirements","Support and onboarding"];
export function PricingPage() {
  return <PageFrame active="pricing"><main className="page-main container"><div className="pricing-intro"><Eyebrow>ACCESS & AVAILABILITY</Eyebrow><h1>A clearer path to <span className="text-accent">your QA workspace.</span></h1><p>We are keeping access information straightforward while the product evolves. Talk to the team for the latest desktop availability, setup guidance, and commercial details.</p><div className="pricing-intro-meta"><span><CheckCircle2 size={13}/> No outdated price claims</span><span><Mail size={13}/> Direct team contact</span></div></div>
    <div className="pricing-grid"><article className="price-card featured"><div className="price-badges"><span className="badge badge-accent">DESKTOP WORKSPACE</span></div><small>QaBox Desktop</small><div className="price"><strong>Get access</strong></div><p className="enterprise-copy">Use web and Android scanning, test case management, AI Studio, MCP tools, automation, Reporter, and bug analysis in the QaBox workflow.</p><ButtonLink href="mailto:hello@qabox.id?subject=QaBox%20Desktop%20Access">Request access <ArrowUpRight size={16}/></ButtonLink><h4>Product workflow</h4><ul className="check-list">{proFeatures.map(x=><li key={x}>{x}</li>)}</ul></article>
      <article className="price-card"><div className="price-badges"><span className="badge">PRODUCT QUESTIONS</span></div><small>Talk to QaBox</small><div className="price"><strong>Contact us</strong></div><p className="enterprise-copy">Ask about current availability, supported workflows, setup, or team requirements. We will share the latest information instead of showing outdated pricing.</p><ButtonLink href="mailto:hello@qabox.id?subject=QaBox%20Product%20Inquiry" secondary>Contact QaBox <ArrowUpRight size={16}/></ButtonLink><h4>Helpful topics</h4><ul className="check-list">{enterpriseFeatures.map(x=><li key={x}>{x}</li>)}</ul></article></div>
    <p className="pricing-footnote">Availability and included capabilities may change between releases. The QaBox team can confirm the current build and supported setup before you get started.</p>
    <div className="trust-row"><span><CheckCircle2/> Desktop-first QA workflow</span><span><ShieldCheck/> Local MCP tooling</span><span><Zap/> Built for QA teams</span></div>
  </main></PageFrame>;
}
