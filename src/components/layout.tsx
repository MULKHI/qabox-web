import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./shared";

const navLinks = [
  { href: "/#how-it-works", label: "How it works", key: "how" },
  { href: "/#product", label: "Product", key: "product" },
  { href: "/#agents", label: "AI agents", key: "agents" },
  { href: "/docs", label: "Docs", key: "docs" },
  { href: "/pricing", label: "Pricing", key: "pricing" },
];

export function Header({ active = "" }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`qx-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="qx-header-inner">
        <Brand compact />
        <nav className="qx-nav" aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.key} href={link.href} className={active === link.key ? "is-active" : ""} aria-current={active === link.key ? "page" : undefined} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="qx-header-actions">
          <a className="qx-link" href="/sign-in">Sign in</a>
          <a className="qx-btn qx-btn-sm" href="/sign-up">Get started <ArrowUpRight size={14} aria-hidden="true" /></a>
          <button className="qx-menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="qx-footer">
      <div className="qx-container qx-footer-grid">
        <div className="qx-footer-brand">
          <Brand compact />
          <p>A desktop workspace for QA engineers who want AI help that actually knows the app under test.</p>
          <a className="qx-footer-mail" href="mailto:hello@qabox.id">hello@qabox.id</a>
        </div>
        <div>
          <h3>Product</h3>
          <a href="/#how-it-works">How it works</a>
          <a href="/#product">Desktop workspace</a>
          <a href="/#bug-analysis">Bug analysis</a>
          <a href="/#agents">AI agents & MCP</a>
          <a href="/pricing">Pricing</a>
        </div>
        <div>
          <h3>Resources</h3>
          <a href="/docs">Documentation</a>
          <a href="/docs#quick-start">Quick start</a>
          <a href="/docs#automation">Automation guide</a>
          <a href="/#faq">FAQ</a>
        </div>
        <div>
          <h3>Company</h3>
          <a href="mailto:hello@qabox.id?subject=QaBox%20Product%20Question">Contact</a>
          <a href="mailto:hello@qabox.id?subject=QaBox%20Feedback">Send feedback</a>
          <a href="/docs#privacy">Privacy</a>
          <a href="/docs#terms">Terms</a>
        </div>
      </div>
      <div className="qx-container qx-footer-bottom">
        <span>© {new Date().getFullYear()} QaBox</span>
        <span>Made for people who read test logs for fun.</span>
      </div>
    </footer>
  );
}

export function PageFrame({ children, active = "" }: { children: ReactNode; active?: string }) {
  return <><Header active={active} />{children}<Footer /></>;
}
