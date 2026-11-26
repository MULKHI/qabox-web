import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { faqs } from "../../lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="qx-section" id="faq">
      <div className="qx-container faq">
        <div className="faq-intro">
          <span className="qx-kicker">FAQ</span>
          <h2>Questions people actually ask us.</h2>
          <p>Something missing? Email <a href="mailto:hello@qabox.id">hello@qabox.id</a> and a human will answer.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className={`faq-item${isOpen ? " is-open" : ""}`}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    {q}
                    <Plus size={16} aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="faq-answer"
                    >
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="cta2">
      <div className="qx-container cta2-inner">
        <img src="/qabox-logo.png" alt="" width={44} height={44} />
        <h2>Give your agent the context.<br />Keep the judgement.</h2>
        <p>Create an account, open the desktop app, and scan your first page in a few minutes.</p>
        <div className="hero2-actions">
          <a className="qx-btn" href="/sign-up">Create an account <ArrowUpRight size={15} aria-hidden="true" /></a>
          <a className="qx-btn qx-btn-ghost" href="/docs">Read the docs</a>
        </div>
      </div>
    </section>
  );
}
