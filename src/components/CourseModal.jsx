import React from 'react';
import { createPortal } from 'react-dom';
import GlassCard from './GlassCard';

const CourseModal = ({ course, mode, onClose }) => {
  if (!course) return null;

  const basePrice = course.basePrice || 9999;
  const finalPrice = mode === 'offline' ? Math.round(basePrice * 1.15) : basePrice;
  const modules = course.modules || [
    'Market Fundamentals', 'Technical Analysis', 'Risk Management', 'Live Execution'
  ];

  // The Modal Content
  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <GlassCard className="w-full max-w-lg p-0 overflow-hidden border border-financio-primary/30 shadow-2xl shadow-black relative animate-fade-in">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl font-light z-10 leading-none"
        >
          &times;
        </button>

        <div className="bg-financio-primary p-6 text-white">
          <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs font-bold uppercase mb-2">
            {course.category || 'Course'}
          </span>
          <h2 className="text-2xl font-bold pr-8">{course.title}</h2>
        </div>

        <div className="p-8 space-y-6 bg-slate-900/90">
          <div className="flex justify-between text-sm text-financio-muted border-b border-white/10 pb-4">
            <span>Format: <strong className="text-white capitalize">{mode}</strong></span>
            <span>Duration: <strong className="text-white">4 Weeks</strong></span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">What you'll learn</h4>
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
              {modules.map((mod, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="h-5 w-5 rounded-full bg-financio-success/20 text-financio-success flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  {mod}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-4 flex justify-between items-center border border-white/5">
            <div>
              <p className="text-xs text-financio-muted uppercase">Total Fee</p>
              <p className="text-2xl font-bold text-white">₹{finalPrice.toLocaleString()}</p>
              {mode === 'offline' && <p className="text-[10px] text-financio-primary">+15% Offline Prem. included</p>}
            </div>
            <button className="px-6 py-3 bg-financio-success hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/20">
              Enroll
            </button>
          </div>
        </div>

      </GlassCard>
    </div>
  );

  // Magic Portal: Renders this directly into the <body> tag
  return createPortal(modalContent, document.body);
};

export default CourseModal;
