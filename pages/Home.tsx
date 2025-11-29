import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, ArrowRight, Rocket, Calendar, Globe } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Home: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <div className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 p-2 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg animate-fade-in">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E4007C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E4007C]"></span>
            </span>
            <span className="text-xs font-bold tracking-wider text-white uppercase shadow-black drop-shadow-md">{content.hero.badge}</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 text-white drop-shadow-lg leading-tight">
            {content.hero.title}
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            {content.hero.subtitle}
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
            <Link 
              to="/register" 
              className="px-10 py-5 rounded-xl bg-white text-[#E4007C] font-black text-lg shadow-xl hover:shadow-2xl hover:bg-gray-50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              {content.hero.ctaRegister} <ArrowRight size={20} />
            </Link>
            <Link 
              to="/about" 
              className="px-10 py-5 rounded-xl bg-transparent text-white border-2 border-white/50 font-bold text-lg hover:bg-white/10 transition-all shadow-md flex items-center justify-center"
            >
              {content.hero.ctaLearn}
            </Link>
          </div>
        </div>
      </div>

      {/* Why Participate */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight drop-shadow-md">Why Participate?</h2>
          <div className="h-2 w-24 bg-white/30 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              icon: <Lightbulb className="w-10 h-10" />, 
              color: "text-white", 
              bg: "bg-[#E4007C]", 
              title: "Launch a Startup", 
              desc: "Transform your idea into a real business with mentorship and support from industry experts." 
            },
            { 
              icon: <Globe className="w-10 h-10" />, 
              color: "text-white", 
              bg: "bg-[#7A1CAC]", 
              title: "Global Network", 
              desc: "Connect with changemakers from around the world and become part of the global Hult Prize community." 
            },
            { 
              icon: <Rocket className="w-10 h-10" />, 
              color: "text-white", 
              bg: "bg-black", 
              title: "$1M Prize", 
              desc: "Compete for the chance to win $1,000,000 in seed capital to scale your social enterprise." 
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-3xl shadow-xl hover:-translate-y-2 transition-all group">
              <div className={`w-20 h-20 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform rotate-3 group-hover:rotate-0`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-gray-900 uppercase tracking-wide">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-16">
           <span className="text-white/80 font-bold tracking-widest uppercase text-sm mb-2 block">Mark Your Calendar</span>
           <h2 className="text-5xl font-black text-white tracking-tight drop-shadow-md">Event Timeline</h2>
        </div>
        
        <div className="relative border-l-4 border-white/20 ml-6 md:ml-0 space-y-16">
          {content.timeline.map((event: any, index: number) => (
            <div key={index} className="relative pl-12 md:pl-0 group">
               {/* Dot */}
               <div className="absolute left-[-12px] top-1 w-6 h-6 bg-white rounded-full border-4 border-[#E4007C] shadow-md group-hover:scale-125 transition-transform z-10"></div>
               
               {/* Content */}
               <div className={`md:w-[45%] ${index % 2 === 0 ? 'md:ml-auto md:text-left md:pl-16' : 'md:mr-auto md:text-right md:pr-16'}`}>
                  <div className="inline-block px-5 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-sm mb-3 shadow-sm">
                    <Calendar className="w-4 h-4 inline mr-2 relative bottom-[1px]" />
                    {event.date}
                  </div>
                  <h3 className="text-2xl font-bold mt-1 text-white group-hover:text-pink-200 transition-colors drop-shadow-sm">{event.title}</h3>
                  <p className="text-white/80 mt-3 font-medium leading-relaxed">{event.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center pt-8">
        <div className="relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 rounded-[3rem] p-12 md:p-20 shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight drop-shadow-md">Ready to change the world?</h2>
            <Link to="/register" className="inline-block bg-white text-[#E4007C] px-12 py-5 rounded-2xl font-black text-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
              REGISTER NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;