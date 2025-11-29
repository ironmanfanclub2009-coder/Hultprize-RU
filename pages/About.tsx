import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { Users, Target, Globe } from 'lucide-react';

const About: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
      
      {/* Mission & Vision */}
      <section className="text-center max-w-4xl mx-auto">
        <span className="text-white/80 font-bold tracking-widest uppercase text-sm mb-4 block">Who We Are</span>
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-white drop-shadow-md">Our Mission</h1>
        <p className="text-xl text-white/90 leading-relaxed mb-16 font-medium drop-shadow-sm">
          {content.about.mission}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2rem] text-left shadow-xl border border-white/20 hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#E4007C] mb-6 shadow-lg">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Vision</h2>
            <p className="text-white/80 leading-relaxed">
              {content.about.vision}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2rem] text-left shadow-xl border border-white/20 hover:bg-white/20 transition-all">
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#7A1CAC] mb-6 shadow-lg">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">RU Campus Program</h2>
            <p className="text-white/80 leading-relaxed">
              {content.about.campusProgram}
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {content.team && content.team.length > 0 && (
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4 drop-shadow-md">Meet the Team</h2>
            <div className="h-1.5 w-24 bg-white/30 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.team.map((member: any, idx: number) => (
              <div key={idx} className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl text-center shadow-lg hover:-translate-y-2 transition-transform group flex flex-col items-center">
                
                {member.image ? (
                   <div className="w-32 h-32 mb-6 rounded-full p-1 bg-white/20 border-2 border-white/30 shadow-lg group-hover:scale-105 transition-transform overflow-hidden relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover rounded-full bg-gray-200"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.classList.add('hidden');
                          e.currentTarget.parentElement?.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                   </div>
                ) : null}

                {/* Fallback Icon - displayed if no image or image error */}
                <div className={`w-32 h-32 bg-white/20 rounded-full mb-6 flex items-center justify-center text-white border-2 border-white/30 shadow-lg group-hover:scale-105 transition-transform ${member.image ? 'hidden' : ''}`}>
                  <Users size={40} />
                </div>

                <h3 className="text-xl font-bold text-white mb-1 drop-shadow-sm">{member.name}</h3>
                <p className="text-sm text-pink-200 font-semibold uppercase tracking-wide">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-3xl mx-auto bg-black/20 backdrop-blur-lg rounded-[2.5rem] p-8 md:p-12 border border-white/10">
        <h2 className="text-3xl font-black text-center mb-10 text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white/95 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-[#E4007C]">Who can participate?</h3>
            <p className="text-gray-700">Any current student of Rajshahi University (Undergrad, Masters, or PhD) can participate.</p>
          </div>
          <div className="bg-white/95 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-[#E4007C]">Do I need a startup idea to register?</h3>
            <p className="text-gray-700">It is recommended to have a basic idea, but you can refine it later. You need a team of 3-4 members.</p>
          </div>
          <div className="bg-white/95 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-[#E4007C]">Is there a registration fee?</h3>
            <p className="text-gray-700">No, participation in the Hult Prize On-Campus program is completely free.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;