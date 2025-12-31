import React, { useState } from 'react';
import GlassCard from './GlassCard';
import CourseModal from './CourseModal';

export default function Programs() {
  const [activeTab, setActiveTab] = useState('All');
  const [isOffline, setIsOffline] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const getPrice = (basePrice) => {
    const price = basePrice || 0;
    return isOffline ? Math.round(price * 1.15) : price;
  };

  const majorPrograms = [
    { id: "starter", title: "Foundation Investor", category: "Beginner", basePrice: 45000, subtitle: "Levels 0 - 2", icon: "🎓", desc: "Complete foundation for new investors.", modules: ["L0: Market Foundations", "L1: Wealth Planning", "L2: Trading Basics"] },
    { id: "pro", title: "Professional Trader", category: "Intermediate", basePrice: 95000, subtitle: "Levels 0 - 9", icon: "💼", desc: "Advanced trading strategies and systems.", modules: ["Includes Foundation", "L3: Tech Analysis", "L5: Options", "L8: Risk"] },
    { id: "elite", title: "Elite Master", category: "Advanced", basePrice: 180000, subtitle: "Levels 0 - 12+", icon: "🏆", desc: "Mastery level algorithmic and quant trading.", modules: ["Includes Pro", "L6: Algo/Python", "L11: CFA/FRM Prep", "L12: Market Immersion"] }
  ];

  const modularCourses = [
    { id: 100, title: "L0: Foundations", category: "Beginner", basePrice: 5000, icon: "🏛" },
    { id: 101, title: "L1: Investing", category: "Beginner", basePrice: 8000, icon: "💰" },
    { id: 102, title: "L2: Trading", category: "Beginner", basePrice: 10000, icon: "⌨️" },
    { id: 103, title: "L3: Tech Analysis", category: "Beginner", basePrice: 15000, icon: "📊" },
    { id: 104, title: "L4: Fundamentals", category: "Intermediate", basePrice: 20000, icon: "📈" },
    { id: 105, title: "L5: Options", category: "Intermediate", basePrice: 25000, icon: "⚡" },
    { id: 106, title: "L6: Algo Trading", category: "Intermediate", basePrice: 35000, icon: "🤖" },
    { id: 107, title: "L7: Data Analytics", category: "Intermediate", basePrice: 15000, icon: "🔍" },
    { id: 108, title: "L8: Risk Mgmt", category: "Advanced", basePrice: 12000, icon: "🛡" },
    { id: 109, title: "L9: Psychology", category: "Advanced", basePrice: 10000, icon: "🧠" },
    { id: 110, title: "L10: Compliance", category: "Advanced", basePrice: 8000, icon: "⚖️" },
    { id: 111, title: "L11: Cert Prep", category: "Advanced", basePrice: 18000, icon: "📜" }
  ];

  const allCourses = [...majorPrograms, ...modularCourses];
  const filteredCourses = activeTab === 'All' ? allCourses : allCourses.filter(c => c.category === activeTab);

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Controls */}
      <GlassCard className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-40 backdrop-blur-md bg-[#0f172a]/95 border-b border-white/10 shadow-2xl">
        <div className="flex gap-2 p-1 bg-black/40 rounded-xl overflow-x-auto w-full md:w-auto">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-financio-primary text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-white/5 flex-shrink-0">
          <span className={`text-sm font-medium ${!isOffline ? 'text-white' : 'text-gray-400'}`}>Online</span>
          <button 
            onClick={() => setIsOffline(!isOffline)}
            className={`w-12 h-6 rounded-full p-1 transition-colors relative ${isOffline ? 'bg-financio-primary' : 'bg-gray-600'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${isOffline ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          {/* Removed the (+15%) text label as requested */}
          <span className={`text-sm font-medium ${isOffline ? 'text-white' : 'text-gray-400'}`}>Offline</span>
        </div>
      </GlassCard>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <GlassCard 
            key={course.id} 
            className="
              p-6 flex flex-col min-h-[320px] 
              bg-[#1e293b]/60 hover:bg-[#1e293b]/90 
              border border-white/5 hover:border-financio-primary/40 
              transition-all duration-300 ease-out 
              group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]
            "
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-financio-primary/20 to-purple-500/20 flex items-center justify-center text-2xl border border-white/10 group-hover:border-financio-primary/50 transition-colors shadow-inner">
                {course.icon}
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-gray-400 border border-white/5 group-hover:text-white transition-colors">
                {course.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-financio-primary transition-colors">{course.title}</h3>
            <p className="text-sm text-gray-400 mb-6">{course.subtitle || 'Certification Module'}</p>

            {course.modules && (
              <ul className="mb-6 space-y-2">
                {course.modules.slice(0, 3).map((m, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-center gap-2 group-hover:text-gray-300">
                    <span className="text-financio-success">✓</span> {m}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Total Fees</p>
                <p className="text-lg font-bold text-white font-mono">₹{getPrice(course.basePrice).toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setSelectedCourse(course)}
                className="px-6 py-2 rounded-lg bg-financio-primary text-white text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 active:scale-95"
              >
                Enroll
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* MODAL */}
      {selectedCourse && (
        <CourseModal 
          course={selectedCourse} 
          mode={isOffline ? 'offline' : 'online'} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
}
