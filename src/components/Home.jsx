import React from 'react';
import GlassCard from './GlassCard';

export default function Home({ setActivePage }) {
  return (
    <div className="max-w-6xl mx-auto space-y-7 animate-fade-in">
      <section className="relative overflow-hidden rounded-3xl border border-cyan-200/20 bg-gradient-to-br from-slate-950/95 via-blue-950/75 to-slate-900/95 p-5 md:p-6 lg:p-8 shadow-[0_20px_80px_rgba(15,23,42,0.5)]">
        <div className="pointer-events-none absolute -top-20 left-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -right-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.2),transparent_28%),radial-gradient(circle_at_78%_32%,rgba(34,211,238,0.3),transparent_30%),radial-gradient(circle_at_58%_78%,rgba(59,130,246,0.25),transparent_28%)]" />

        <div className="relative grid lg:grid-cols-[1.08fr_0.92fr] gap-6 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/90">Market Education. Practical Execution.</p>

            <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-cyan-100/20 bg-slate-900/70 px-4 py-3">
              <img
                src="/LOGO.png"
                alt="Financio"
                className="h-12 md:h-14 w-auto object-contain"
              />
              <div className="h-10 w-px bg-white/20" />
              <p className="text-sm md:text-base font-semibold text-slate-100">by Great Ventures</p>
            </div>

            <h1 className="mt-6 text-[2rem] md:text-[2.4rem] xl:text-[3rem] font-black leading-[1.08] text-white max-w-4xl">
              Professional market education for disciplined traders.
            </h1>

            <p className="mt-4 text-[0.98rem] md:text-[1.05rem] text-slate-200 max-w-2xl leading-relaxed">
              Financio is the customer-facing brand operated by Great Ventures, the legally registered firm for banking and payment operations.
            </p>

            <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              <div className="rounded-2xl border border-cyan-100/20 bg-cyan-300/10 px-3 py-3.5">
                <p className="text-2xl">📊</p>
                <p className="text-xs mt-2 text-slate-100 font-semibold">Live Market Context</p>
              </div>
              <div className="rounded-2xl border border-blue-100/20 bg-blue-300/10 px-3 py-3.5">
                <p className="text-2xl">🧠</p>
                <p className="text-xs mt-2 text-slate-100 font-semibold">Structured Thinking</p>
              </div>
              <div className="rounded-2xl border border-indigo-100/20 bg-indigo-300/10 px-3 py-3.5">
                <p className="text-2xl">⚡</p>
                <p className="text-xs mt-2 text-slate-100 font-semibold">Fast Execution</p>
              </div>
              <div className="rounded-2xl border border-emerald-100/20 bg-emerald-300/10 px-3 py-3.5">
                <p className="text-2xl">🛡️</p>
                <p className="text-xs mt-2 text-slate-100 font-semibold">Risk Discipline</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setActivePage('Academy')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold"
              >
                Explore Academy
              </button>
              <button
                onClick={() => setActivePage('Live Markets')}
                className="px-6 py-3 rounded-xl border border-white/30 hover:border-white/70 text-white font-semibold"
              >
                Open Live Markets
              </button>
              <button
                onClick={() => setActivePage('Contact Us')}
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 text-white font-semibold"
              >
                Talk To Team
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-cyan-100/30 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-slate-900/60 p-4 md:p-5 shadow-[0_16px_45px_rgba(6,182,212,0.2)]">
              <p className="text-xs uppercase tracking-[0.26em] text-cyan-100 font-semibold">Official Identity Spotlight</p>
              <p className="text-xs text-slate-300 mt-2">Primary identity cards for payment gateway, legal, and customer clarity.</p>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-cyan-200/30 bg-slate-950/70 p-5 shadow-[0_8px_30px_rgba(34,211,238,0.2)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Brand Name</p>
                      <h3 className="text-3xl font-black mt-1 text-white">Financio</h3>
                      <p className="mt-2 text-sm text-slate-300">Public-facing name for website, learning programs, and customer communication.</p>
                    </div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/20 text-2xl shrink-0">💠</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-200/30 bg-slate-950/70 p-5 shadow-[0_8px_30px_rgba(59,130,246,0.2)]">
                  <div className="flex items-start gap-4">
                    <img
                      src="/GREAT_VENTURES.png"
                      alt="Great Ventures"
                      className="h-16 w-auto object-contain rounded-lg bg-white/5 px-2 py-1"
                    />
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.24em] text-blue-100">Legal Entity</p>
                      <h3 className="text-3xl font-black mt-1 text-white">Great Ventures</h3>
                      <p className="mt-2 text-sm text-slate-300">Registered firm name for legal documentation, banking, and payment gateway operations.</p>
                    </div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-300/20 text-2xl shrink-0">🏛️</span>
                  </div>
                </div>
              </div>
            </div>

            <GlassCard className="p-5 border-indigo-200/20 bg-slate-900/70">
              <p className="text-xs uppercase tracking-[0.22em] text-indigo-100">Education Focus</p>
              <h3 className="text-xl font-black mt-2">Learning Roadmap</h3>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <p className="text-2xl">📘</p>
                  <p className="text-[11px] mt-1 text-slate-200">Basics</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <p className="text-2xl">🧮</p>
                  <p className="text-[11px] mt-1 text-slate-200">Analysis</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <p className="text-2xl">🏆</p>
                  <p className="text-[11px] mt-1 text-slate-200">Mastery</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5 border-emerald-200/20 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <p className="text-sm text-slate-100 leading-relaxed">
                  Compliance disclosure: Financio is the operating brand, while Great Ventures is the legal and financial entity.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <p className="text-2xl">🎓</p>
          <h3 className="text-lg font-bold mt-3">Stepwise Learning</h3>
          <p className="mt-2 text-sm text-financio-muted">Start from fundamentals and progress toward advanced market execution methods.</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-2xl">📍</p>
          <h3 className="text-lg font-bold mt-3">Scenario Mapping</h3>
          <p className="mt-2 text-sm text-financio-muted">Learn to plan possible market outcomes before taking any position.</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-2xl">⏱️</p>
          <h3 className="text-lg font-bold mt-3">Timing And Patience</h3>
          <p className="mt-2 text-sm text-financio-muted">Develop discipline around entry timing, exits, and no-trade conditions.</p>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-2xl">🔍</p>
          <h3 className="text-lg font-bold mt-3">Review Loop</h3>
          <p className="mt-2 text-sm text-financio-muted">Track performance patterns and continuously improve your decisions.</p>
        </GlassCard>
      </section>

      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4">
        <GlassCard className="p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-blue-200">Inside Financio</p>
          <h2 className="text-2xl md:text-3xl font-black mt-3">A home for structured, practical trading growth.</h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xl">🛰️</p>
              <p className="mt-2 text-sm text-slate-200">Live market awareness and context-based commentary.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xl">📚</p>
              <p className="mt-2 text-sm text-slate-200">Focused modules for options, risk, and execution planning.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xl">🧭</p>
              <p className="mt-2 text-sm text-slate-200">Clear decision frameworks for every trading day.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xl">🤝</p>
              <p className="mt-2 text-sm text-slate-200">Mentorship and accountability to keep progress steady.</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-cyan-100/15 bg-cyan-400/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Education Graphics</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-sm">🎒 Beginner Friendly</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-sm">📒 Structured Notes</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-sm">🧑‍🏫 Guided Sessions</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 bg-gradient-to-b from-blue-600/20 via-cyan-500/10 to-slate-900/50 border-blue-200/25">
          <p className="text-xs uppercase tracking-[0.22em] text-blue-100">Ready To Begin</p>
          <h2 className="text-2xl md:text-3xl font-black mt-3">Build confidence before capital.</h2>
          <p className="mt-3 text-slate-200">Join the platform and move from random trades to process-driven decisions.</p>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => setActivePage('Academy')}
              className="w-full px-5 py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100"
            >
              Go To Academy
            </button>
            <button
              onClick={() => setActivePage('Dashboard')}
              className="w-full px-5 py-3 rounded-xl bg-slate-900/70 border border-white/20 text-white font-semibold hover:bg-slate-900"
            >
              Open Dashboard
            </button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
