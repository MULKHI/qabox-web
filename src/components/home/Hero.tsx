import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Lock, RotateCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type Target = { id: string; role: string; name: string; selector: string; note: string };

const targets: Target[] = [
  { id: "email", role: "textbox", name: "Email", selector: '[data-test="checkout-email"]', note: "Validates format on blur" },
  { id: "coupon", role: "textbox", name: "Coupon code", selector: "#coupon-code", note: "Uppercases input, max 12 chars" },
  { id: "apply", role: "button", name: "Apply", selector: 'button[data-test="apply-coupon"]', note: "POST /api/cart/coupon → 200 | 422" },
  { id: "shipping", role: "radiogroup", name: "Shipping", selector: 'input[name="shipping"]', note: "Express adds $9.00 to total" },
  { id: "order", role: "button", name: "Place order", selector: '[data-test="place-order"]', note: "Disabled until form is valid" },
];

function LiveScan() {
  const [active, setActive] = useState(0);
  const [captured, setCaptured] = useState(1);
  const paused = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setCaptured(targets.length); return; }
    const timer = window.setInterval(() => {
      if (paused.current) return;
      setActive((i) => {
        const next = (i + 1) % targets.length;
        setCaptured((c) => Math.max(c, next + 1));
        return next;
      });
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const focus = (i: number) => { setActive(i); setCaptured((c) => Math.max(c, i + 1)); };
  const t = (id: string) => {
    const i = targets.findIndex((x) => x.id === id);
    return {
      "data-target": id,
      className: active === i ? "is-target" : undefined,
      onMouseEnter: () => focus(i),
      onFocus: () => focus(i),
    };
  };

  const current = targets[active];

  return (
    <div className="scan" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="scan-browser">
        <div className="scan-chrome">
          <span className="scan-dots" aria-hidden="true"><i /><i /><i /></span>
          <div className="scan-url"><Lock size={11} aria-hidden="true" /> staging.acme-shop.app/checkout</div>
          <RotateCw size={13} aria-hidden="true" className="scan-reload" />
        </div>
        <div className="scan-page">
          <div className="scan-page-head">
            <b>Checkout</b>
            <span>2 items · $84.00</span>
          </div>
          <label className="scan-field">
            <span>Email</span>
            <input {...t("email")} readOnly value="dina@acme.co" aria-label="Demo email field" />
          </label>
          <div className="scan-row">
            <label className="scan-field">
              <span>Coupon</span>
              <input {...t("coupon")} readOnly value="WELCOME10" aria-label="Demo coupon field" />
            </label>
            <button type="button" {...t("apply")} className={`scan-ghost ${active === 2 ? "is-target" : ""}`}>Apply</button>
          </div>
          <fieldset {...t("shipping")} className={`scan-radios ${active === 3 ? "is-target" : ""}`}>
            <legend>Shipping</legend>
            <label><input type="radio" name="demo-ship" defaultChecked tabIndex={-1} /> Standard <em>Free</em></label>
            <label><input type="radio" name="demo-ship" tabIndex={-1} /> Express <em>$9.00</em></label>
          </fieldset>
          <button type="button" {...t("order")} className={`scan-primary ${active === 4 ? "is-target" : ""}`}>Place order</button>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="scan-tooltip"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <b>{current.role}</b> {current.name}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="scan-panel" aria-live="polite">
        <div className="scan-panel-head">
          <span>Application knowledge</span>
          <span className="scan-count"><i /> {captured}/{targets.length} captured</span>
        </div>
        <ul className="scan-list">
          {targets.map((item, i) => (
            <li key={item.id} className={`${i < captured ? "is-captured" : ""} ${i === active ? "is-active" : ""}`}>
              <button type="button" onClick={() => focus(i)}>
                <span className="scan-role">{item.role}</span>
                <span className="scan-name">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="scan-detail">
          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <code><span className="tok-k">selector</span> {current.selector}</code>
              <code><span className="tok-k">behavior</span> {current.note}</code>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero2">
      <div className="hero2-grid" aria-hidden="true" />
      <div className="qx-container">
        <motion.div
          className="hero2-copy"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a className="hero2-pill" href="/docs#quick-start">
            <span>New</span> Android scanning over USB <ArrowRight size={13} aria-hidden="true" />
          </a>
          <h1>Your AI writes the tests.<br /><span>QaBox tells it what&apos;s on the page.</span></h1>
          <p>
            Scan the app you&apos;re testing, keep what you learn next to your test cases, and let Claude, Cursor or any
            MCP client generate scripts against real selectors, real flows and real API calls.
          </p>
          <div className="hero2-actions">
            <a className="qx-btn" href="/sign-up">Start free <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a className="qx-btn qx-btn-ghost" href="#how-it-works">See how it works</a>
          </div>
          <p className="hero2-note">Desktop app for Windows, macOS & Linux · Chrome extension · Android via USB</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <LiveScan />
          <p className="hero2-caption">Hover the form. This is roughly what the extension records on every page you scan.</p>
        </motion.div>
      </div>
    </section>
  );
}
