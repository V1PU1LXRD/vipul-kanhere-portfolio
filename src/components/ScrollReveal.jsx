"use client"; // Animations run in the browser
import { motion } from "framer-motion";

/*
 *  Wrap any content in <ScrollReveal> ... </ScrollReveal> and it will
 *  fade + slide up when the user scrolls it into view.
 *
 *  Usage example:
 *    <ScrollReveal>
 *      <h2>My Skills</h2>
 *      <p>Some text...</p>
 *    </ScrollReveal>
 */
export default function ScrollReveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}    // start invisible, 40px down
      whileInView={{ opacity: 1, y: 0 }} // animate to visible, original position
      viewport={{ once: true, amount: 0.2 }} // trigger once when 20% visible
      transition={{ duration: 0.7, delay: delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}