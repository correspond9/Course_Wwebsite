import React from 'react';

const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`
        relative
        rounded-3xl
        border border-white/10
        backdrop-blur-xl
        shadow-2xl
        text-white
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(2,6,23,0.45)]

        /* Base glass */
        bg-[#0f172a]/70

        /* Premium blue glow */
        before:absolute before:inset-0
        before:rounded-3xl
        before:bg-gradient-to-br
        before:from-blue-600/10
        before:to-indigo-600/5
        before:opacity-100
        before:pointer-events-none

        after:absolute after:inset-[1px]
        after:rounded-3xl
        after:bg-gradient-to-b after:from-white/[0.04] after:to-transparent
        after:pointer-events-none

        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
