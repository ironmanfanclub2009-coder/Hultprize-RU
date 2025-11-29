import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin@hultprize-ru.org' && password.trim() === 'hultprize2025byNishan') {
      localStorage.setItem('hult_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] w-full max-w-md shadow-2xl relative overflow-hidden border border-white/40 animate-fade-in">
        
        {/* Decorative background elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E4007C]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#7A1CAC]/10 rounded-full blur-3xl"></div>

        <div className="text-center mb-10 relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-[#E4007C] to-[#7A1CAC] rounded-3xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-pink-500/20 text-white ring-4 ring-white/50">
            <Lock className="w-10 h-10 -rotate-3" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Portal</h2>
          <p className="text-gray-600 text-sm mt-2 font-medium">Secure access for organizers</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50/80 backdrop-blur border border-red-200 rounded-xl text-red-600 text-sm text-center font-bold animate-pulse shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 ml-1 tracking-wider">Username</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E4007C] transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/50 border border-white/60 text-gray-900 font-medium transition-all focus:bg-white focus:border-[#E4007C] focus:ring-4 focus:ring-[#E4007C]/10 outline-none shadow-sm placeholder:text-gray-400"
                placeholder="admin@hultprize-ru.org"
              />
            </div>
          </div>
          <div className="space-y-2">
             <label className="text-xs font-bold uppercase text-gray-500 ml-1 tracking-wider">Password</label>
            <div className="relative group">
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E4007C] transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/50 border border-white/60 text-gray-900 font-medium transition-all focus:bg-white focus:border-[#E4007C] focus:ring-4 focus:ring-[#E4007C]/10 outline-none shadow-sm placeholder:text-gray-400"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-[#E4007C] to-[#7A1CAC] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all mt-6 text-lg flex items-center justify-center gap-2 group"
          >
            Login to Dashboard <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;