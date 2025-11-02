import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroSpline from './components/HeroSpline';
import LoginCard from './components/LoginCard';
import VenueGrid from './components/VenueGrid';
import FooterAbout from './components/FooterAbout';

function App() {
  const [role, setRole] = useState(null);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(1200px_circle_at_10%_-10%,#164e63_0%,transparent_40%),radial-gradient(1200px_circle_at_90%_-20%,#0e7490_0%,transparent_36%),#020617]">
      <HeroSpline />

      <main className="mx-auto max-w-6xl px-6">
        <section className="-mt-20 md:-mt-24">
          <LoginCard onSuccess={(r) => setRole(r)} />
          <AnimatePresence>
            {role && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-white/80 backdrop-blur-xl"
              >
                <p>
                  Logged in as <span className="font-medium text-white">{role}</span>. Explore the dashboard preview below.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <VenueGrid />
      <FooterAbout />
    </div>
  );
}

export default App;
