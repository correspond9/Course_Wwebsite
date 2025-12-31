import React from 'react';
import GlassCard from './GlassCard';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <GlassCard className="p-10 border-t-4 border-financio-primary">
        <h1 className="text-4xl font-bold text-white mb-2">About Financio.</h1>
        <p className="text-sm font-semibold text-financio-primary tracking-widest uppercase mb-6">Mumbai, India</p>
        
        <div className="space-y-6 text-financio-muted leading-relaxed">
          <p>
            Welcome to Financio, a premier destination for aspiring and professional traders seeking to master the complexities of the financial markets. Founded with a vision to democratize institutional-grade trading knowledge, we bridge the critical gap between theoretical finance and practical, live-market execution.
          </p>
          <p>
            In an era where algorithmic trading and high-frequency systems dominate, the retail trader often feels left behind. Financio exists to level the playing field. We provide a robust ecosystem that combines state-of-the-art technical analysis tools with deep fundamental research, ensuring our members aren't just participating in the market—they are understanding it.
          </p>
          <p>
            Our curriculum and terminal are designed by veterans who have navigated multiple market cycles. From deciphering candlestick psychology to engineering complex options spreads, our mission is to transform novices into disciplined, profitable risk managers. We believe that consistency is not a product of luck, but the result of rigorous preparation and superior technology.
          </p>
        </div>
      </GlassCard>

      <GlassCard className="p-6 flex items-center justify-between bg-gradient-to-r from-financio-glass to-financio-primary/10 border border-financio-primary/20">
        <span className="text-sm text-white font-medium">Partnered with Straddly to provide innovative derivatives trading solutions for traders of all levels.</span>
        <span className="text-2xl">🤝</span>
      </GlassCard>
    </div>
  );
};

export default AboutUs;
