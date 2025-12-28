import React from 'react';

const GlassCard = ({ title, value, children, className }) => {
  return (
    <div className={`
      relative overflow-hidden
      /* Transparent enough to show the dark tint, blurred enough to feel premium */
      bg-white/10 backdrop-blur-2xl 
      /* Clean, thin border that pops against the dark background */
      border border-white/20
      rounded-[2.5rem] p-8 shadow-[0_25px_50px_rgba(0,0,0,0.5)] 
      animate-shine ${className}
    `}>
      {title && <h3 className="text-white/50 text-xs font-black uppercase tracking-widest mb-1">{title}</h3>}
      {value && <p className="text-white text-3xl font-black tracking-tight">{value}</p>}
      <div className="mt-2 text-white/90">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;