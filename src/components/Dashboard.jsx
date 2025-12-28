import React from 'react';

const Dashboard = () => {
  const stats = [
    { title: "Total Revenue", value: "₹4,25,000", change: "+12.5%", icon: "💰" },
    { title: "Active Students", value: "1,284", change: "+3.2%", icon: "👥" },
    { title: "Course Sales", value: "452", change: "+8.4%", icon: "📈" },
    { title: "Watch Time", value: "12,400h", change: "+15.1%", icon: "🕒" },
  ];

  // This helps React find your image in the public folder correctly
  const imagePath = process.env.PUBLIC_URL + '/3d_Blue_Button2.png';

  return (
    <div className="space-y-10 py-6">
      <div className="flex justify-between items-center px-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight italic uppercase">
            Dashboard
          </h1>
          <p className="text-blue-400 font-bold opacity-70 tracking-widest text-xs uppercase">
            Market Insights & Student Analytics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="premium-3d-card p-10"
            style={{ backgroundImage: `url(${imagePath})` }}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl filter drop-shadow-md">{stat.icon}</span>
              <span className="text-white font-black text-[10px] bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20">
                {stat.change}
              </span>
            </div>
            
            <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-2">
              {stat.title}
            </p>
            
            <p className="text-white text-3xl font-black tracking-tighter italic drop-shadow-lg">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;