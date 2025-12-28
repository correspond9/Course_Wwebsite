import React from 'react';
import { DollarSign, Users, Activity, TrendingUp, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} />
      </div>
      <span className="text-green-500 text-xs font-bold flex items-center gap-1">
        {trend} <TrendingUp size={12} />
      </span>
    </div>
    <p className="text-gray-500 text-sm font-medium">{title}</p>
    <h4 className="text-2xl font-bold text-gray-900 mt-1">{value}</h4>
  </div>
);

const OverviewStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Revenue" 
        value="$12,450" 
        icon={DollarSign} 
        trend="+12%" 
        color="bg-emerald-50 text-emerald-600" 
      />
      <StatCard 
        title="Active Users" 
        value="1,240" 
        icon={Users} 
        trend="+5%" 
        color="bg-blue-50 text-blue-600" 
      />
      <StatCard 
        title="Avg. Progress" 
        value="78%" 
        icon={Activity} 
        trend="+2%" 
        color="bg-purple-50 text-purple-600" 
      />
    </div>
  );
};

export default OverviewStats;