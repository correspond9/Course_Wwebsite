import React from 'react';
import { useAuth } from '../context/AuthContext';
import GlassCard from './GlassCard';

const Dashboard = ({ setActivePage }) => {
  const { user, isAdmin } = useAuth();

  if (!user) return (
    <div className="flex items-center justify-center h-96 animate-fade-in">
      <GlassCard className="p-8 text-center max-w-md border-red-500/30">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-white mb-2">Access Restricted</h2>
        <p className="text-financio-muted">Please log in to view your dashboard</p>
      </GlassCard>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <GlassCard className="p-10 bg-gradient-to-r from-financio-glass to-financio-primary/10 border-none">
        <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}</h1>
        <p className="text-financio-muted mt-2">
          {isAdmin ? 'System Administrator' : 'Standard Account'}
        </p>
        
        {isAdmin && (
          <button 
            onClick={() => setActivePage('Command Center')}
            className="mt-6 px-6 py-3 bg-financio-primary text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-all"
          >
            Open Command Center ⚡
          </button>
        )}
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-xs font-bold text-financio-muted uppercase tracking-wider">Enrolled Courses</h3>
          <p className="text-4xl font-bold text-white mt-4">0</p>
        </GlassCard>
        
        <GlassCard className="p-6">
          <h3 className="text-xs font-bold text-financio-muted uppercase tracking-wider">Assignments</h3>
          <p className="text-4xl font-bold text-white mt-4">0</p>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-xs font-bold text-financio-muted uppercase tracking-wider">Simulated P&L</h3>
          <p className="text-4xl font-bold text-financio-muted mt-4">--</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
