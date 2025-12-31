import React, { useState } from 'react';
import GlassCard from './GlassCard'; // Preserving your import, though we style directly below
import CourseModal from './CourseModal';

export default function Programs() {
  const [activeTab, setActiveTab] = useState('All');
  const [isOffline, setIsOffline] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null); // Modal state

  // Helper to calculate price based on switch
  const getPrice = (basePrice) => isOffline ? Math.round(basePrice * 1.15) : basePrice;

  // 1. TOP 3 PROGRAMS (Distributed by Category)
  // I have added 'desc' and 'modules' to these so the modal has content to show
  const majorPrograms = [
    { 
        id: "starter", title: "Foundation Investor", category: "Beginner", basePrice: 45000, subtitle: "Levels 0 - 2", icon: "🎓",
        desc: "Complete foundation for new investors.",
        modules: ["L0: Market Foundations", "L1: Wealth Planning", "L2: Trading Basics"]
    },
    { 
        id: "pro", title: "Professional Trader", category: "Intermediate", basePrice: 95000, subtitle: "Levels 0 - 9", icon: "💼",
        desc: "Advanced trading strategies and systems.",
        modules: ["Includes Foundation", "L3: Tech Analysis", "L5: Options", "L8: Risk"]
    },
    { 
        id: "elite", title: "Elite Master", category: "Advanced", basePrice: 180000, subtitle: "Levels 0 - 12+", icon: "🏆",
        desc: "Mastery level algorithmic and quant trading.",
        modules: ["Includes Pro", "L6: Algo/Python", "L11: CFA/FRM Prep", "L12: Market Immersion"]
    }
  ];

  // 2. NEXT 12 MODULAR COURSES (Distributed 4+4+4)
  const modularCourses = [
    // FIRST 4 -> BEGINNER
    { id: 0, title: "L0: Foundations", category: "Beginner", basePrice: 5000, icon: "🏛" },
    { id: 1, title: "L1: Investing", category: "Beginner", basePrice: 8000, icon: "💰" },
    { id: 2, title: "L2: Trading", category: "Beginner", basePrice: 10000, icon: "⌨️" },
    { id: 3, title: "L3: Tech Analysis", category: "Beginner", basePrice: 15000, icon: "📊" },

    // NEXT 4 -> INTERMEDIATE
    { id: 4, title: "L4: Fundamentals", category: "Intermediate", basePrice: 20000, icon: "📈" },
    { id: 5, title: "L5: Options", category: "Intermediate", basePrice: 25000, icon: "⚡" },
    { id: 6, title: "L6: Algo Trading", category: "Intermediate", basePrice: 35000, icon: "🤖" },
    { id: 7, title: "L7: Data Analytics", category: "Intermediate", basePrice: 15000, icon: "🔍" },

    // LAST 4 -> ADVANCED
    { id: 8, title: "L8: Risk Mgmt", category: "Advanced", basePrice: 12000, icon: "🛡" },
    { id: 9, title: "L9: Psychology", category: "Advanced", basePrice: 10000, icon: "🧠" },
    { id: 10, title: "L10: Compliance", category: "Advanced", basePrice: 8000, icon: "⚖️" },
    { id: 11, title: "L11: Cert Prep", category: "Advanced", basePrice: 18000, icon: "📜" }
  ];

  // Combine all courses
  const allCourses = [...majorPrograms, ...modularCourses];

  // Filter logic
  const filteredCourses = activeTab === 'All' ? allCourses : allCourses.filter(c => c.category === activeTab);

  return (
    <div className="flex flex-col h-full space-y-6 animate-fade-in-up pb-20">
      
      {/* 1. Header Controls (Centered Pills from your file) */}
      <div className="flex justify-center">
        <div className="bg-white/10 p-1 rounded-full flex space-x-1 backdrop-blur-md border border-white/10 shadow-lg">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((tab) => (
             <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
             >
               {tab}
             </button>
          ))}
        </div>
      </div>

      {/* 2. Grid Layout (Using the styling classes from your uploaded file) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-20">
        {filteredCourses.map((course) => (
           <div 
             key={course.id}
             className="relative group bg-slate-800/80 hover:bg-slate-800 border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20"
           >
              {/* Badge */}
              <div className="absolute top-4 right-4">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    course.category === 'Beginner' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
                    course.category === 'Intermediate' ? 'border-blue-400/30 text-blue-300 bg-blue-400/10' :
                    'border-white/30 text-white bg-white/10'
                 }`}>
                   {course.category}
                 </span>
              </div>

              {/* Icon & Title */}
              <div className="mb-6 mt-2">
                 <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner border border-white/5">
                    {course.icon}
                 </div>
                 <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {course.title}
                 </h3>
                 {/* Subtitle / Desc from your file */}
                 <p className="text-cyan-400/80 text-xs font-bold tracking-wide">
                    {course.subtitle || 'Certification Module'}
                 </p>
                 
                 {/* Optional: Render small module checklist if present (like in majorPrograms) */}
                 {course.modules && (
                    <div className="mt-4 space-y-1">
                      {course.modules.slice(0, 3).map((m, i) => (
                         <div key={i} className="flex items-center text-[10px] text-gray-400">
                           <span className="text-blue-500 mr-2">✓</span> {m}
                         </div>
                      ))}
                    </div>
                 )}
              </div>

              {/* Footer from your file */}
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                 <div>
                    <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Total Fees</p>
                    <p className="text-2xl font-black text-white tracking-tight">
                      ₹{getPrice(course.basePrice).toLocaleString()}
                    </p>
                 </div>
                 <button 
                   onClick={() => setSelectedCourse(course)}
                   className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-900/40 transition-all transform active:scale-95"
                 >
                   Enroll
                 </button>
              </div>
           </div>
        ))}
      </div>

      {/* Modal - keeping the interactivity active */}
      {selectedCourse && (
        <CourseModal 
          course={{
            ...selectedCourse,
            price: selectedCourse.basePrice // Modal expects 'price'
          }} 
          mode={isOffline ? 'offline' : 'online'} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
}
