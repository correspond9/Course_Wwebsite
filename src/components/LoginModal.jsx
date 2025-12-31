import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import GlassCard from './GlassCard';

const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
      onClose(); // Close modal on success
    } catch (err) {
      setError('Authentication failed. Check credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <GlassCard className="w-full max-w-md p-8 border border-financio-primary/30 shadow-2xl relative bg-slate-900/90">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl leading-none"
        >
          &times;
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-financio-muted text-sm">
            {isLogin ? 'Enter your credentials to access the terminal' : 'Join Financio for professional market intelligence'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-financio-muted uppercase mb-1">Full Name</label>
              <input
                type="text"
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-financio-primary focus:outline-none transition-colors"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-financio-muted uppercase mb-1">Email Address</label>
            <input
              type="email"
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-financio-primary focus:outline-none transition-colors"
              placeholder="trader@financio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-financio-muted uppercase mb-1">Password</label>
            <input
              type="password"
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-financio-primary focus:outline-none transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 bg-financio-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-900/20 mt-2"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Get Started')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-financio-muted hover:text-white underline decoration-financio-primary underline-offset-4"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>

      </GlassCard>
    </div>
  );
};

export default LoginModal;
