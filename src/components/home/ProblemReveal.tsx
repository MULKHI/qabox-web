import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const text =
  "Any model can write a Playwright test in ten seconds. It just doesn't know your checkout button is called place-order, that the coupon field validates on blur, or that payment resolves before the order does. So you rewrite half of it. QaBox hands the agent that context first.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const highlight = /place-order|blur|QaBox/.test(word);
  return (
    <motion.span style={{ opacity }} className={highlight ? "reveal-hl" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

export function ProblemReveal() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  return (
    <section className="reveal-section" id="why">
      <div className="qx-container reveal-inner">
        <span className="qx-kicker">The problem</span>
        <p ref={ref} className="reveal-text">
          {words.map((word, i) => (
            <Word key={i} word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  );
}
