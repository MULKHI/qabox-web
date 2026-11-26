import type { ReactNode } from "react";

export const asset = (path: string) => path;

export function Brand({ compact = false }: { compact?: boolean }) {
  return <a className="brand" href="/" aria-label="QaBox home"><img src={asset("/qabox-logo.png")} alt="" /><span>QaBox</span>{!compact && <small>QA WORKSPACE</small>}</a>;
}
export function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <a className={secondary ? "button button-secondary" : "button"} href={href}>{children}</a>;
}
export function Eyebrow({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "muted" }) {
  return <div className={`eyebrow ${tone}`}><span />{children}</div>;
}
export function SectionHeading({ tag, title, text, center = false }: { tag: string; title: ReactNode; text?: string; center?: boolean }) {
  return <div className={center ? "section-heading center" : "section-heading"}><Eyebrow>{tag}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}
