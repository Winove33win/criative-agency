import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Attempting login...");

    if (password === 'admin123') {
      console.log("Password correct. Setting localStorage...");
      localStorage.setItem('isAdmin', 'true');
      
      // Dispatch a storage event to help any listeners update immediately
      window.dispatchEvent(new Event("storage"));

      console.log("Navigating to dashboard...");
      // Primary navigation method
      navigate('/admin/dashboard');

      // Fallback: If react-router navigate doesn't trigger immediately in this environment, force hash change
      setTimeout(() => {
        if (!window.location.href.includes('dashboard')) {
           console.log("Fallback navigation triggered");
           window.location.hash = '/admin/dashboard';
        }
      }, 100);

    } else {
      console.warn("Access denied: Incorrect password");
      alert('Access Denied');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
           <h1 className="text-3xl font-bold font-['Syne'] text-white">ADMIN <span className="text-fuchsia-500">PANEL</span></h1>
           <p className="text-zinc-500 mt-2">Enter credentials to manage content</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-zinc-400 text-sm mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-fuchsia-600 text-white font-bold rounded-lg hover:bg-fuchsia-500 transition-colors">
            Access Dashboard
          </button>
        </form>
        <div className="mt-4 text-center">
            <p className="text-xs text-zinc-600">Default: admin123</p>
        </div>
      </div>
    </div>
  );
};