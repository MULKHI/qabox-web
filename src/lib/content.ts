import { Monitor, Cpu, Terminal } from "lucide-react";

export const downloadTargets = [
  { os: "Windows", label: "Windows 10 / 11", detail: "64-bit installer", ext: ".exe", icon: Monitor },
  { os: "macOS", label: "Apple Silicon & Intel", detail: "M-series and Intel Macs", ext: ".dmg", icon: Cpu },
  { os: "Linux", label: "Linux distributions", detail: "64-bit package", ext: ".AppImage · .deb", icon: Terminal },
];
export const faqs = [
  ["How do I scan a web application?", "Choose Single Page Scan, Manual Record, bounded Auto Crawl, or AI Auto Scan in the Extension. Desktop stages the Application Knowledge bundle, then you select the destination Project and Scan folder before import."],
  ["Can QaBox scan Android applications?", "Yes. QaBox Desktop includes a mobile scanning workflow for Android devices connected over USB."],
  ["How can I create test cases?", "Create test cases manually, use AI-assisted generation, or import test case data from a supported JSON file."],
  ["What does the QaBox MCP server do?", "The local QaBox MCP server exposes supported QA resources and tools. In AI Auto Scan, the agent coordinates with Desktop Bridge and the Extension; the Extension performs browser actions while the agent handles reasoning."],
  ["Which AI agents can I connect?", "Current workflows include Claude, OpenCode, Qwen, and Cursor through MCP-compatible client setups. Exact connection steps depend on the client."],
  ["Does QaBox automatically explore every page?", "No. Auto Crawl is bounded to the configured application scope. AI Auto Scan also follows supported browser actions and safety limits; it is not unrestricted browsing."],
  ["Can I run and review automation?", "Yes. Test runners execute scripts, Reporter integrations return results and evidence, and AI Bug Analysis helps investigate failures with reproduction steps and a structured technical report."],
  ["Where can I get the desktop app?", "Installer links are not published on this website yet. Contact the QaBox team for current access and release information."]
];
