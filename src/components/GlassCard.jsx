import React from 'react';

const GlassCard = ({ children, className = "" }) => {
  return (
    <div className={`
      relative 
      bg-[#0f172a]/60 
      backdrop-blur-xl 
      border border-white/10 
      rounded-3xl 
      shadow-2xl 
      text-white
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;
