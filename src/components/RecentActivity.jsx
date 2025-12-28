import React from 'react';

const RecentActivity = () => {
  const activities = [
    { id: '#8821', user: 'Rahul Sharma', action: 'Plan Upgrade', amount: '₹14,999', status: 'Completed' },
    { id: '#8820', user: 'Aditi Rao', action: 'Logo Upload', amount: '-', status: 'Pending' },
    { id: '#8819', user: 'Vikram Singh', action: 'Renewal', amount: '₹8,499', status: 'Completed' },
  ];

  return (
    <div className="bg-white/20 backdrop-blur-3xl rounded-[3rem] border-t border-l border-white/40 p-10 shadow-2xl animate-shine">
      <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Recent Activity</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-800/60 text-[10px] uppercase font-black tracking-widest">
            <th className="pb-6">ID</th>
            <th className="pb-6">User</th>
            <th className="pb-6">Action</th>
            <th className="pb-6 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="text-slate-900">
          {activities.map((item) => (
            <tr key={item.id} className="border-b border-white/20 group hover:bg-white/10 transition-colors">
              <td className="py-5 font-bold text-blue-900/60">{item.id}</td>
              <td className="py-5 font-bold">{item.user}</td>
              <td className="py-5 text-slate-800/80">{item.action}</td>
              <td className="py-5 font-black text-right text-blue-800">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons - High Contrast */}
      <div className="mt-12 flex justify-center gap-6">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className={`w-12 h-12 rounded-2xl font-black transition-all duration-300 transform active:scale-95 shadow-lg
              ${num === 1 
                ? 'bg-blue-900 text-white' 
                : 'bg-white text-blue-900 hover:bg-blue-50'}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;