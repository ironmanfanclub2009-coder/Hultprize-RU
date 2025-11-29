import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Instagram, Facebook, Mail, Globe } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  // Admin dashboard should remain light for readability
  const isAdminDashboard = location.pathname.startsWith('/admin/dashboard');

  // Direct SVG link is often more reliable than thumb versions
  const LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/b/b3/Hult_Prize_Logo.svg";

  return (
    <div className={`min-h-screen w-full flex flex-col font-sans selection:bg-pink-100 selection:text-[#E4007C] ${
      isAdminDashboard 
        ? 'bg-gray-50 text-gray-900' 
        : 'bg-gradient-to-br from-[#C6007E] via-[#8B1FA2] to-[#4A148C] text-white'
    }`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isAdminDashboard ? 'bg-white shadow-sm' : 'bg-black/20 backdrop-blur-xl border-b border-white/10'
      }`}>
        {isAdminDashboard && <div className="h-1 bg-gradient-to-r from-[#E4007C] via-[#7A1CAC] to-[#E4007C]"></div>}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              {/* Logo */}
              <img 
                src={LOGO_URL}
                alt="Hult Prize Logo" 
                className={`h-12 md:h-14 w-auto object-contain transition-all ${isAdminDashboard ? '' : 'brightness-0 invert'}`}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback Text if Image Fails */}
              <span className={`hidden text-2xl font-black tracking-tighter ${isAdminDashboard ? 'text-[#E4007C]' : 'text-white'}`}>HULT PRIZE</span>
              
              <div className={`hidden md:flex flex-col h-full justify-center border-l-2 pl-3 ${isAdminDashboard ? 'border-gray-300' : 'border-white/30'}`}>
                 <span className={`font-bold text-[10px] md:text-xs tracking-[0.2em] leading-tight ${isAdminDashboard ? 'text-gray-900' : 'text-white'}`}>RAJSHAHI</span>
                 <span className={`font-bold text-[10px] md:text-xs tracking-[0.2em] leading-tight ${isAdminDashboard ? 'text-[#E4007C]' : 'text-white/80'}`}>UNIVERSITY</span>
              </div>
            </Link>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2">
                <Link 
                  to="/" 
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    isActive('/') 
                      ? (isAdminDashboard ? 'text-[#E4007C] bg-pink-50' : 'bg-white text-[#E4007C] shadow-lg') 
                      : (isAdminDashboard ? 'text-gray-600 hover:text-[#E4007C]' : 'text-white/90 hover:text-white hover:bg-white/10')
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    isActive('/about') 
                      ? (isAdminDashboard ? 'text-[#E4007C] bg-pink-50' : 'bg-white text-[#E4007C] shadow-lg') 
                      : (isAdminDashboard ? 'text-gray-600 hover:text-[#E4007C]' : 'text-white/90 hover:text-white hover:bg-white/10')
                  }`}
                >
                  About
                </Link>
                {!isAdminDashboard && (
                  <Link 
                    to="/register" 
                    className={`ml-4 px-8 py-3 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 ${
                      isActive('/register') 
                        ? 'bg-[#E4007C] text-white ring-4 ring-[#E4007C]/30' 
                        : 'bg-[#E4007C] text-white hover:bg-[#c9006b]'
                    }`}
                  >
                    Register Now
                  </Link>
                )}
                {isAdminDashboard && (
                   <Link to="/" className="ml-4 px-6 py-2 rounded-full text-sm font-bold border border-gray-300 hover:bg-gray-100 text-gray-700">
                     View Site
                   </Link>
                )}
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors ${
                  isAdminDashboard ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute w-full z-50 shadow-2xl animate-fade-in ${
            isAdminDashboard ? 'bg-white border-b border-gray-200' : 'bg-[#4A148C]/95 backdrop-blur-xl border-b border-white/10'
          }`}>
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link 
                to="/" 
                onClick={closeMenu}
                className={`block px-4 py-4 rounded-xl text-lg font-bold transition-colors ${
                  isAdminDashboard ? 'text-gray-700 hover:bg-pink-50' : 'text-white hover:bg-white/10'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={closeMenu}
                className={`block px-4 py-4 rounded-xl text-lg font-bold transition-colors ${
                  isAdminDashboard ? 'text-gray-700 hover:bg-pink-50' : 'text-white hover:bg-white/10'
                }`}
              >
                About
              </Link>
              <Link 
                to="/register" 
                onClick={closeMenu}
                className="block px-4 py-4 rounded-xl text-lg font-bold bg-[#E4007C] text-white shadow-lg mt-4 text-center"
              >
                Register Now
              </Link>
              <Link
                to="/admin"
                onClick={closeMenu}
                className={`block px-4 py-4 rounded-xl text-sm font-medium mt-2 text-center ${
                  isAdminDashboard ? 'text-gray-400' : 'text-white/50 hover:text-white'
                }`}
              >
                Admin Access
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      {!isAdminDashboard && (
        <footer className="bg-black/90 text-white mt-auto pt-16 pb-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                  {/* Replaced Logo Image with Text */}
                  <span className="text-2xl font-black tracking-tighter text-white">HULT PRIZE</span>
                  <div className="flex flex-col border-l border-white/50 pl-2">
                     <span className="font-bold text-[10px] tracking-[0.2em]">RAJSHAHI</span>
                     <span className="font-bold text-[10px] tracking-[0.2em] text-white/70">UNIVERSITY</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-medium">
                  Leading a generation to change the world. The official Hult Prize On-Campus program at Rajshahi University.
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <h4 className="font-bold mb-6 text-white tracking-[0.2em] uppercase text-xs border-b-2 border-[#E4007C] pb-2">Connect With Us</h4>
                <div className="flex space-x-6">
                  <a href="https://www.facebook.com/hultprize.rajshahiuniversity" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-1">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/hultprize.ru/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full hover:bg-[#E4405F] hover:text-white transition-all transform hover:-translate-y-1">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="mailto:hultprize.ru2026@gmail.com" className="bg-white/5 p-3 rounded-full hover:bg-[#E4007C] hover:text-white transition-all transform hover:-translate-y-1">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
                <a href="mailto:hultprize.ru2026@gmail.com" className="mt-6 text-sm font-medium text-gray-500 hover:text-white transition-colors">
                  hultprize.ru2026@gmail.com
                </a>
              </div>

              <div className="flex flex-col items-center md:items-end justify-center">
                <Link to="/admin" className="text-xs font-bold text-gray-600 hover:text-white flex items-center gap-2 mb-6 transition-colors px-4 py-2 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5">
                   <User size={14} /> Admin Portal
                </Link>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-medium">© 2025 Hult Prize Rajshahi University</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
              <p className="text-gray-500">Changing the world through social enterprise.</p>
              <p className="flex items-center gap-1 mt-4 md:mt-0 font-medium text-gray-500">
                Developed by
                <a 
                  href="https://portfolionishan.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#E4007C] font-bold transition-colors ml-1 border-b border-transparent hover:border-[#E4007C]"
                >
                  Nishan Rahman
                </a>
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;