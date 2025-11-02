import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroSpline = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient and glass overlays for depth (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 backdrop-blur-[6px] bg-gradient-to-t from-slate-900/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
          Venyo • Futuristic Venue Management
        </span>
        <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_1px_16px_rgba(6,182,212,0.15)]">
          Manage Halls, Labs, and Auditoriums Seamlessly
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-white/80">
          A calm, modern workspace with glassmorphic depth and smooth motion. Log in to check availability, request bookings, and streamline approvals.
        </p>
      </div>
    </section>
  );
};

export default HeroSpline;
