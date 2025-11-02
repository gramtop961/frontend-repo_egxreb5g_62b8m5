import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const FooterAbout = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasShown) {
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
            setHasShown(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controls, hasShown]);

  return (
    <footer ref={ref} className="relative mt-16 border-t border-white/10 bg-gradient-to-b from-transparent to-slate-900/60">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={controls}
        className="mx-auto max-w-5xl px-6 py-10"
      >
        <p className="text-sm text-white/70">
          Venyo — a futuristic and simple venue management platform designed for colleges and communities. Manage halls, labs, and auditoriums seamlessly.
        </p>
        <p className="mt-3 text-sm text-white/70">
          Created & Designed by{' '}
          <span className="cursor-pointer bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent transition [text-shadow:0_0_12px_rgba(34,211,238,0.35)] hover:opacity-90">
            Luthfi ✦
          </span>
          . Built with a focus on clarity, simplicity, and modern motion design.
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterAbout;
