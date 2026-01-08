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

        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
