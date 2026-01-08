import React from 'react';
import { PlayCircle, FileText, Lock } from 'lucide-react';

const Learning = () => {
  const lessons = [
    { title: "Introduction to Price Action", type: "Video", duration: "15 min", status: "Free" },
    { title: "Risk Management 101", type: "Guide", duration: "10 page PDF", status: "Free" },
    { title: "Advanced Straddle Setup", type: "Video", duration: "45 min", status: "Premium" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, idx) => (
          <div key={idx} className="bg-slate-800/40 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-600/20 rounded-xl text-blue-500">
                {lesson.type === "Video" ? <PlayCircle size={24} /> : <FileText size={24} />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full">{lesson.status}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 italic tracking-tighter">{lesson.title}</h3>
            <p className="text-slate-400 text-sm mb-6 font-medium">{lesson.duration}</p>
            <button className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${lesson.status === 'Free' ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>
              {lesson.status === 'Free' ? 'Access Lesson' : 'Locked'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;