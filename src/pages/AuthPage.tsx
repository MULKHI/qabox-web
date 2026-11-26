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

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");
  const [show,setShow] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const isRegister = mode === "register";
  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    if (isRegister && password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const endpoint = isRegister ? "/api/v1/auth/register" : "/api/v1/auth/login";
      const response = await fetch(`${API_BASE}${endpoint}`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(isRegister ? {name,email,password} : {email,password}) });
      const result = await response.json().catch(()=>({}));
      if (!response.ok) throw new Error(result?.message || result?.error || `Request failed (${response.status})`);
      let token = getToken(result as AuthResult);
      let user = getUser(result as AuthResult);
      if (isRegister && !token) {
        const loginResponse = await fetch(`${API_BASE}/api/v1/auth/login`, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});
        const loginResult = await loginResponse.json().catch(()=>({}));
        if (loginResponse.ok) { token = getToken(loginResult as AuthResult); user = getUser(loginResult as AuthResult); }
      }
      if (!token) throw new Error(isRegister ? "Account created. Please sign in to continue." : "Login failed — no token returned.");
      localStorage.setItem("qabox_token",token);
      localStorage.setItem("qabox_user",JSON.stringify(user));
      window.history.pushState({}, "", "/dashboard");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }
  return <div className="auth-shell"><div className="auth-orb"/><a className="auth-back" href="/"><ArrowDown size={15}/> Back to website</a><div className="auth-card-wrap"><div className="auth-brand"><Brand/></div><div className="auth-heading"><Eyebrow>{isRegister ? "GET STARTED" : "SIGN IN"}</Eyebrow><h1>{isRegister ? "Create an account" : "Welcome back"}</h1><p>{isRegister ? "Create your account to access your QaBox workspace" : "Sign in to your QaBox account"}</p></div><form className="auth-card" onSubmit={submit}>
    {isRegister && <label>FULL NAME<input required value={name} onChange={e=>setName(e.target.value)} placeholder="John Doe" autoComplete="name"/></label>}
    <label>EMAIL ADDRESS<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@company.com" autoComplete="email"/></label>
    <label>PASSWORD<div className="password-wrap"><input required type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder={isRegister?"Create a password":"Enter your password"} autoComplete={isRegister?"new-password":"current-password"}/><button type="button" aria-label={show?"Hide password":"Show password"} aria-pressed={show} onClick={()=>setShow(!show)}>{show?"Hide":"Show"}</button></div></label>
    {isRegister && <label>CONFIRM PASSWORD<input required type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm your password" autoComplete="new-password"/></label>}
    {error && <div className="form-error"><CircleAlert size={15}/>{error}</div>}
    <button className="button auth-submit" type="submit" disabled={loading}>{loading ? "PLEASE WAIT…" : isRegister ? "CREATE ACCOUNT" : "SIGN IN"} <ArrowRight size={16}/></button>
    <div className="auth-switch">{isRegister ? "Already have an account?" : "Don't have an account?"} <a href={isRegister?"/sign-in":"/sign-up"}>{isRegister?"Sign in":"Create account"}</a></div>
  </form><p className="auth-caption">VIBE CODING FOR QA</p></div>

  </div>;
}
