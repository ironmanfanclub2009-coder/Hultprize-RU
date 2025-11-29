import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Users, User, Info, Sparkles, UserPlus, Phone, Mail, Briefcase, GraduationCap } from 'lucide-react';

export default function Registration() {
  const [activeTab, setActiveTab] = useState<'team' | 'individual'>('team');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: 'team' | 'individual') => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const apiURL = type === 'team' 
      ? "https://sheetdb.io/api/v1/wc0o99d2dn16z"
      : "https://sheetdb.io/api/v1/3h9y7w4wk1cmg";

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      
      if (data.created === 1) {
        setSuccess(true);
        form.reset();
        window.scrollTo(0, 0);
      } else {
        throw new Error("Submission failed on server.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setError(null);
  };

  const InputField = ({ label, name, type = "text", placeholder, required = false, icon: Icon, color = "pink" }: { label: string, name: string, type?: string, placeholder: string, required?: boolean, icon?: any, color?: 'pink' | 'purple' }) => (
    <div className="space-y-1.5">
      <label className="text-sm font-bold text-gray-800 flex items-center gap-1 ml-1">
        {label} {required && <span className="text-[#E4007C]">*</span>}
      </label>
      <div className="relative group">
        {Icon && (
          <div className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all pointer-events-none z-10 ${
             color === 'pink' ? 'bg-pink-100 text-[#E4007C] group-focus-within:bg-[#E4007C] group-focus-within:text-white shadow-sm' : 'bg-purple-100 text-[#7A1CAC] group-focus-within:bg-[#7A1CAC] group-focus-within:text-white shadow-sm'
          }`}>
            <Icon size={16} />
          </div>
        )}
        <input 
          required={required} 
          name={name} 
          type={type} 
          placeholder={placeholder} 
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-4 rounded-xl border border-white/50 text-gray-900 font-medium focus:bg-white focus:border-[#E4007C] focus:ring-4 focus:ring-[#E4007C]/20 outline-none transition-all placeholder:text-gray-400 placeholder:font-normal shadow-inner ${
            color === 'pink' ? 'bg-pink-50/50 focus:bg-pink-50' : 'bg-purple-50/50 focus:bg-purple-50'
          }`} 
        />
      </div>
    </div>
  );

  const SectionHeader = ({ title, subtitle, required = false, color = "pink" }: { title: string, subtitle?: string, required?: boolean, color?: 'pink' | 'purple' }) => (
    <div className={`flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-100/50 gap-2 md:gap-4 p-4 -mx-8 -mt-8 ${color === 'pink' ? 'bg-gradient-to-r from-[#E4007C]/10 to-transparent' : 'bg-gradient-to-r from-[#7A1CAC]/10 to-transparent'}`}>
      <div className="pl-4 md:pl-6">
        <h3 className={`text-xl font-black flex items-center gap-2 tracking-tight ${color === 'purple' ? 'text-[#7A1CAC]' : 'text-[#E4007C]'}`}>
          {title}
        </h3>
        {subtitle && <p className="text-sm text-gray-600 mt-0.5 font-medium">{subtitle}</p>}
      </div>
      <div className="pl-4 md:pr-6">
        <span className={`self-start md:self-center text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${
            required 
            ? 'bg-gradient-to-r from-[#E4007C] to-[#b60063] text-white' 
            : 'bg-white text-gray-500 border border-gray-200'
        }`}>
            {required ? 'Required' : 'Optional'}
        </span>
      </div>
    </div>
  );

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white/90 backdrop-blur-2xl p-12 rounded-[2rem] text-center max-w-lg w-full animate-fade-in shadow-2xl relative overflow-hidden border border-white/60">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-green-50">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-gray-900 tracking-tight">Registration Successful!</h2>
          <p className="text-gray-600 mb-10 leading-relaxed font-medium text-lg">
            Welcome to the Hult Prize family! We have received your details and will contact you soon.
          </p>
          <button 
            onClick={handleReset}
            className="w-full px-8 py-4 bg-gradient-to-r from-[#E4007C] to-[#7A1CAC] text-white rounded-xl font-black transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide"
          >
            Register Another Team
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 relative min-h-screen">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 shadow-xl ring-1 ring-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-white shadow-black drop-shadow-md">Registration Open</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-white">Journey</span>
          </h1>
          <p className="text-pink-100 max-w-2xl mx-auto text-lg font-medium leading-relaxed drop-shadow-md">
            The world's largest social impact competition starts here. Register your team to compete for $1M in seed capital.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="sticky top-24 z-30 flex justify-center mb-12">
           <div className="bg-white/80 backdrop-blur-2xl p-1.5 rounded-2xl flex shadow-2xl max-w-sm w-full border border-white/40 ring-1 ring-white/50">
            <button
              onClick={() => { setActiveTab('team'); setError(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-sm ${
                activeTab === 'team' 
                  ? 'bg-gradient-to-r from-[#E4007C] to-[#c9006b] text-white shadow-lg transform scale-105 ring-2 ring-pink-200' 
                  : 'text-gray-600 hover:bg-white/50 hover:text-[#E4007C]'
              }`}
            >
              <Users size={18} /> Team
            </button>
            <button
              onClick={() => { setActiveTab('individual'); setError(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-sm ${
                activeTab === 'individual' 
                  ? 'bg-gradient-to-r from-[#7A1CAC] to-[#601588] text-white shadow-lg transform scale-105 ring-2 ring-purple-200' 
                  : 'text-gray-600 hover:bg-white/50 hover:text-[#7A1CAC]'
              }`}
            >
              <User size={18} /> Individual
            </button>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="animate-fade-in space-y-8">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50/90 backdrop-blur-md text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-200 shadow-lg max-w-3xl mx-auto">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
              <span className="font-bold text-sm">{error}</span>
            </div>
          )}

          {/* TEAM REGISTRATION FORM */}
          {activeTab === 'team' && (
            <form id="teamForm" onSubmit={(e) => handleSubmit(e, 'team')} className="space-y-8">
              
              {/* Info Banner */}
              <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-lg border-l-4 border-[#E4007C] flex flex-col sm:flex-row gap-4 items-start sm:items-center max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-[#E4007C] to-[#c9006b] p-3 rounded-full text-white shadow-md">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Team Requirement</h3>
                  <p className="text-gray-600 text-sm mt-1 font-medium">
                    A team must consist of <strong className="text-[#E4007C]">3 to 4 members</strong>. All members must be current students.
                  </p>
                </div>
              </div>

              {/* Section 1: Team Identity */}
              <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group border border-white/50">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E4007C] via-[#ff6cb6] to-[#E4007C]"></div>
                <SectionHeader 
                  title="Team Identity" 
                  subtitle="Choose a name that represents your vision" 
                  required={true}
                  color="pink"
                />
                <div className="grid gap-6">
                  <div className="space-y-3">
                    <label className="text-base font-bold text-gray-900 flex items-center gap-2 ml-1">
                      <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Team Name <span className="text-[#E4007C]">*</span>
                    </label>
                    <div className="relative group">
                      <input 
                        required 
                        name="data[teamName]" 
                        type="text" 
                        placeholder="e.g. The Change Makers"
                        className="w-full px-6 py-5 rounded-2xl bg-gradient-to-br from-pink-50/50 to-white border-2 border-pink-100 text-gray-900 font-black text-xl md:text-2xl focus:bg-white focus:ring-4 focus:ring-[#E4007C]/20 focus:border-[#E4007C] outline-none transition-all placeholder:font-normal placeholder:text-gray-400 shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Team Leader */}
              <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden border border-white/50">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#7A1CAC] via-[#a840e6] to-[#7A1CAC]"></div>
                <SectionHeader 
                  title="Team Leader (Member 1)" 
                  subtitle="Main point of contact for the team"
                  required={true}
                  color="purple"
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                     <InputField label="Full Name" name="data[leader_name]" placeholder="Enter full name" required icon={User} color="purple" />
                  </div>
                  <InputField label="Department" name="data[leader_department]" placeholder="e.g. Marketing" required icon={Briefcase} color="purple" />
                  <InputField label="Year / Semester" name="data[year]" placeholder="e.g. 3rd Year" required icon={GraduationCap} color="purple" />
                  <InputField label="Phone Number" name="data[leader_phone]" type="tel" placeholder="017xxxxxxxx" required icon={Phone} color="purple" />
                  <InputField label="Email Address" name="data[leader_email]" type="email" placeholder="email@example.com" required icon={Mail} color="purple" />
                </div>
              </div>

              {/* Section 3: Member 2 */}
              <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden border border-white/50">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E4007C] via-[#ff6cb6] to-[#E4007C]"></div>
                <SectionHeader 
                  title="Member 02" 
                  subtitle="Second team member details"
                  required={true}
                  color="pink"
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                     <InputField label="Full Name" name="data[member2_name]" placeholder="Enter full name" required icon={User} color="pink" />
                  </div>
                  <InputField label="Department" name="data[member2_department]" placeholder="Department" required icon={Briefcase} color="pink" />
                  <InputField label="Year / Semester" name="data[member2_year]" placeholder="Year / Semester" required icon={GraduationCap} color="pink" />
                  <InputField label="Phone Number" name="data[member2_phone]" type="tel" placeholder="017xxxxxxxx" required icon={Phone} color="pink" />
                  <InputField label="Email Address" name="data[member2_email]" type="email" placeholder="email@example.com" required icon={Mail} color="pink" />
                </div>
              </div>

              {/* Optional Members Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {[3, 4].map((num) => (
                  <div key={num} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl relative overflow-hidden border border-white/50 hover:border-purple-300 transition-colors group">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-200 to-transparent"></div>
                     <SectionHeader 
                        title={`Member 0${num}`} 
                        subtitle="Optional member"
                        required={false}
                        color="purple"
                      />
                     <div className="grid gap-4">
                        <InputField label="Full Name" name={`data[member${num}_name]`} placeholder="Enter full name" icon={User} color="purple" />
                        <InputField label="Department" name={`data[member${num}_department]`} placeholder="Department" icon={Briefcase} color="purple" />
                        <InputField label="Year / Semester" name={`data[member${num}_year]`} placeholder="Year / Semester" icon={GraduationCap} color="purple" />
                        <InputField label="Phone Number" name={`data[member${num}_phone]`} type="tel" placeholder="017xxxxxxxx" icon={Phone} color="purple" />
                        <InputField label="Email Address" name={`data[member${num}_email]`} type="email" placeholder="email@example.com" icon={Mail} color="purple" />
                     </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 pb-12 max-w-2xl mx-auto">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group relative w-full py-5 rounded-2xl bg-gradient-to-r from-[#E4007C] via-[#d6006f] to-[#c9006b] text-white font-black text-xl tracking-wide shadow-2xl hover:shadow-pink-500/50 hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 transition-all overflow-hidden border border-white/20"
                >
                  <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12 -translate-x-full"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? 'Processing...' : <><Send className="w-6 h-6" /> SUBMIT TEAM REGISTRATION</>}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* INDIVIDUAL REGISTRATION FORM */}
          {activeTab === 'individual' && (
            <form id="individualForm" onSubmit={(e) => handleSubmit(e, 'individual')} className="max-w-3xl mx-auto space-y-8 pb-12">
              
              <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/50">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#7A1CAC] via-[#a840e6] to-[#7A1CAC]"></div>
                 
                 <div className="text-center mb-10">
                   <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md ring-4 ring-purple-50">
                     <UserPlus className="w-10 h-10 text-[#7A1CAC]" />
                   </div>
                   <h3 className="text-3xl font-black text-gray-900 mb-2">Individual Sign Up</h3>
                   <p className="text-gray-500 font-medium max-w-sm mx-auto">
                     Don't have a team yet? Register here and we'll help you find teammates.
                   </p>
                 </div>

                 <div className="grid gap-6">
                    <InputField label="Full Name" name="data[Name]" placeholder="Your Full Name" required icon={User} color="purple" />
                    <InputField label="Department" name="data[Department]" placeholder="Your Department" required icon={Briefcase} color="purple" />
                    <InputField label="Year / Semester" name="data[Year]" placeholder="e.g. 3rd Year" required icon={GraduationCap} color="purple" />
                    <InputField label="Phone Number" name="data[phone]" type="tel" placeholder="017xxxxxxxx" required icon={Phone} color="purple" />
                    <InputField label="Email Address" name="data[Email]" type="email" placeholder="you@example.com" required icon={Mail} color="purple" />
                 </div>

                 <div className="mt-10">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#7A1CAC] to-[#601588] text-white font-black text-xl tracking-wide shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-white/20"
                    >
                      {isSubmitting ? 'Registering...' : <><Send className="w-6 h-6" /> COMPLETE SIGN UP</>}
                    </button>
                 </div>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}