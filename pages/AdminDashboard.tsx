import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, RefreshCw, LogOut, Loader2, Users, User, Edit3, Save, RotateCcw, Plus, Trash2, Image, Link as LinkIcon, Calendar } from 'lucide-react';
import { useContent, defaultContent } from '../contexts/ContentContext';

const TEAM_API = 'https://sheetdb.io/api/v1/wc0o99d2dn16z';
const INDIVIDUAL_API = 'https://sheetdb.io/api/v1/3h9y7w4wk1cmg';

const TEAM_HEADERS = [
  'teamName', 
  'leader_name', 'leader_department', 'year', 'leader_phone', 'leader_email',
  'member2_name', 'member2_department', 'member2_year', 'member2_phone', 'member2_email',
  'member3_name', 'member3_department', 'member3_year', 'member3_phone', 'member3_email',
  'member4_name', 'member4_department', 'member4_year', 'member4_phone', 'member4_email'
];

const INDIVIDUAL_HEADERS = [
  'Name', 'Department', 'Year', 'phone', 'Email'
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { content, updateContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState<'team' | 'individual' | 'content'>('team');
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Content editing state
  const [editContent, setEditContent] = useState<any>(null);
  const [isSavingContent, setIsSavingContent] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('hult_admin_auth');
    if (!isAuth) {
      navigate('/admin');
    } else {
      if (activeTab === 'content') {
        // Deep copy including team array if it exists
        setEditContent(JSON.parse(JSON.stringify(content)));
        setLoading(false);
      } else {
        fetchData();
      }
    }
  }, [navigate, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const api = activeTab === 'team' ? TEAM_API : INDIVIDUAL_API;
    try {
      const res = await fetch(api);
      const json = await res.json();
      setData(json);
      setFilteredData(json);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'content') return;
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      const lower = searchTerm.toLowerCase();
      const filtered = data.filter(row => 
        Object.values(row).some(val => 
          String(val).toLowerCase().includes(lower)
        )
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data, activeTab]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      const valA = a[key] ? String(a[key]).toLowerCase() : '';
      const valB = b[key] ? String(b[key]).toLowerCase() : '';
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredData(sorted);
  };

  const handleLogout = () => {
    localStorage.removeItem('hult_admin_auth');
    navigate('/admin');
  };

  const exportToCSV = () => {
    if (data.length === 0) return;
    
    const keys = activeTab === 'team' ? TEAM_HEADERS : INDIVIDUAL_HEADERS;
    
    const csvContent = [
      keys.join(','),
      ...data.map(row => keys.map(key => {
        const val = row[key] ? String(row[key]) : '';
        return `"${val.replace(/"/g, '""')}"`;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `hult_ru_${activeTab}_registrations.csv`;
    link.click();
  };

  const handleContentSave = () => {
    setIsSavingContent(true);
    updateContent(editContent);
    setTimeout(() => {
      setIsSavingContent(false);
      alert("Website content updated successfully!");
    }, 500);
  };

  const handleTimelineChange = (index: number, field: string, value: string) => {
    const newTimeline = [...editContent.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setEditContent({ ...editContent, timeline: newTimeline });
  };

  const handleTeamChange = (index: number, field: string, value: string) => {
    const newTeam = [...(editContent.team || [])];
    newTeam[index] = { ...newTeam[index], [field]: value };
    setEditContent({ ...editContent, team: newTeam });
  };

  const addTeamMember = () => {
    setEditContent({
        ...editContent,
        team: [...(editContent.team || []), { name: "New Member", role: "Role", image: "" }]
    });
  };

  const removeTeamMember = (index: number) => {
    const newTeam = (editContent.team || []).filter((_:any, i:number) => i !== index);
    setEditContent({ ...editContent, team: newTeam });
  };

  const headers = activeTab === 'team' ? TEAM_HEADERS : INDIVIDUAL_HEADERS;

  return (
    <div className="w-full min-h-screen p-4 md:p-8 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage registrations and website content</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-50 text-red-600 rounded-lg transition-colors text-sm border border-gray-200 hover:border-red-200 font-medium"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-1">
          <button
            onClick={() => { setActiveTab('team'); setSearchTerm(''); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-all relative top-[1px] ${
              activeTab === 'team' 
                ? 'bg-white text-[#E4007C] border-t border-x border-gray-200 shadow-sm z-10' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Users size={18} /> Teams
          </button>
          <button
            onClick={() => { setActiveTab('individual'); setSearchTerm(''); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-all relative top-[1px] ${
              activeTab === 'individual' 
                ? 'bg-white text-[#7A1CAC] border-t border-x border-gray-200 shadow-sm z-10' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <User size={18} /> Individuals
          </button>
          <button
            onClick={() => { setActiveTab('content'); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-all relative top-[1px] ${
              activeTab === 'content' 
                ? 'bg-white text-gray-900 border-t border-x border-gray-200 shadow-sm z-10' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Edit3 size={18} /> Website Content
          </button>
        </div>

        {/* CONTENT TAB */}
        {activeTab === 'content' && editContent && (
          <div className="bg-white rounded-b-2xl rounded-tr-2xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-10 animate-fade-in">
            <div className="flex justify-between items-center border-b border-gray-100 pb-6 sticky top-20 bg-white z-20">
              <h2 className="text-xl font-bold text-gray-900">Editor Panel</h2>
              <div className="flex gap-3">
                 <button onClick={() => { resetContent(); setEditContent(defaultContent); alert("Reset to defaults!"); }} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors border border-transparent hover:border-red-100 rounded-lg">
                    <RotateCcw size={16} /> Reset
                 </button>
                 <button onClick={handleContentSave} disabled={isSavingContent} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#E4007C] to-[#7A1CAC] hover:shadow-lg text-white rounded-lg font-bold transition-all transform hover:-translate-y-0.5">
                    <Save size={18} /> {isSavingContent ? 'Saving...' : 'Save Changes'}
                 </button>
              </div>
            </div>

            {/* Hero Section Edit */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-[#E4007C]/30 transition-colors">
              <h3 className="font-black text-[#E4007C] uppercase tracking-wider text-sm mb-6 flex items-center gap-2 bg-pink-50 w-fit px-3 py-1 rounded-full"><Image size={14}/> Hero Section</h3>
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Badge Text</label>
                      <input type="text" value={editContent.hero.badge} onChange={(e) => setEditContent({...editContent, hero: {...editContent.hero, badge: e.target.value}})} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#E4007C] focus:ring-4 focus:ring-[#E4007C]/10 outline-none transition-all font-medium" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Main Title</label>
                      <input type="text" value={editContent.hero.title} onChange={(e) => setEditContent({...editContent, hero: {...editContent.hero, title: e.target.value}})} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#E4007C] focus:ring-4 focus:ring-[#E4007C]/10 outline-none transition-all font-bold" />
                   </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Subtitle</label>
                  <textarea value={editContent.hero.subtitle} onChange={(e) => setEditContent({...editContent, hero: {...editContent.hero, subtitle: e.target.value}})} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#E4007C] focus:ring-4 focus:ring-[#E4007C]/10 outline-none h-20 resize-none transition-all" />
                </div>
              </div>
            </div>

            {/* Timeline Edit */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-[#E4007C]/30 transition-colors">
              <h3 className="font-black text-[#E4007C] uppercase tracking-wider text-sm mb-6 flex items-center gap-2 bg-pink-50 w-fit px-3 py-1 rounded-full"><Calendar size={14}/> Event Timeline</h3>
              <div className="grid gap-4">
                {editContent.timeline.map((item: any, idx: number) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-4 items-start">
                    <div className="bg-[#E4007C] text-white font-bold text-xs p-2 rounded-lg w-8 h-8 flex items-center justify-center shrink-0 shadow-md">{idx + 1}</div>
                    <div className="grid md:grid-cols-3 gap-3 w-full">
                       <input type="text" value={item.date} onChange={(e) => handleTimelineChange(idx, 'date', e.target.value)} placeholder="Date" className="p-3 rounded-lg border border-gray-200 text-sm focus:border-[#E4007C] outline-none" />
                       <input type="text" value={item.title} onChange={(e) => handleTimelineChange(idx, 'title', e.target.value)} placeholder="Title" className="p-3 rounded-lg border border-gray-200 font-bold text-sm focus:border-[#E4007C] outline-none" />
                       <input type="text" value={item.desc} onChange={(e) => handleTimelineChange(idx, 'desc', e.target.value)} placeholder="Description" className="p-3 rounded-lg border border-gray-200 text-sm focus:border-[#E4007C] outline-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About Edit */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-[#E4007C]/30 transition-colors">
              <h3 className="font-black text-[#E4007C] uppercase tracking-wider text-sm mb-6 flex items-center gap-2 bg-pink-50 w-fit px-3 py-1 rounded-full"><Edit3 size={14}/> About Section</h3>
              <div className="grid gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Mission Statement</label>
                  <textarea value={editContent.about.mission} onChange={(e) => setEditContent({...editContent, about: {...editContent.about, mission: e.target.value}})} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#E4007C] focus:ring-4 focus:ring-[#E4007C]/10 outline-none h-24 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Vision Statement</label>
                  <textarea value={editContent.about.vision} onChange={(e) => setEditContent({...editContent, about: {...editContent.about, vision: e.target.value}})} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#E4007C] focus:ring-4 focus:ring-[#E4007C]/10 outline-none h-24 transition-all" />
                </div>
              </div>
            </div>

            {/* Team Edit */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-[#E4007C]/30 transition-colors">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-black text-[#E4007C] uppercase tracking-wider text-sm flex items-center gap-2 bg-pink-50 w-fit px-3 py-1 rounded-full"><Users size={14}/> Organizing Team</h3>
                 <button onClick={addTeamMember} className="text-xs bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-md transition-all">
                    <Plus size={14} /> Add Member
                 </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {(editContent.team || []).map((member: any, idx: number) => (
                  <div key={idx} className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm relative group hover:border-pink-300 transition-colors">
                     <button onClick={() => removeTeamMember(idx)} className="absolute top-3 right-3 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                        <Trash2 size={16} />
                     </button>
                     <div className="space-y-3 pr-8">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Name</label>
                            <input type="text" value={member.name} onChange={(e) => handleTeamChange(idx, 'name', e.target.value)} placeholder="Member Name" className="w-full p-2 rounded-lg border border-gray-200 text-sm font-bold focus:border-[#E4007C] outline-none" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Role</label>
                            <input type="text" value={member.role} onChange={(e) => handleTeamChange(idx, 'role', e.target.value)} placeholder="Role (e.g. Director)" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:border-[#E4007C] outline-none" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1 mb-1"><LinkIcon size={10}/> Image URL</label>
                            <input type="text" value={member.image || ''} onChange={(e) => handleTeamChange(idx, 'image', e.target.value)} placeholder="https://..." className="w-full p-2 rounded-lg border border-gray-200 text-xs text-gray-500 focus:border-[#E4007C] outline-none" />
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* DATA TABS */}
        {activeTab !== 'content' && (
          <>
            {/* Controls */}
            <div className="bg-white p-4 rounded-b-2xl rounded-tr-2xl flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-200 shadow-sm">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab}s...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 transition-all outline-none"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button onClick={fetchData} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm border border-gray-200 text-gray-700 font-medium">
                    <RefreshCw size={16} /> Refresh
                </button>
                <button onClick={exportToCSV} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-sm border border-green-200 font-bold">
                    <Download size={16} /> Export CSV
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md">
              {loading ? (
                <div className="p-20 flex flex-col justify-center items-center gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-[#E4007C]" />
                  <p className="text-gray-400 animate-pulse font-medium">Fetching latest data...</p>
                </div>
              ) : filteredData.length === 0 ? (
                <div className="p-20 text-center text-gray-400 bg-gray-50">
                  No {activeTab} registrations found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="p-4 w-12 text-center font-bold border-b border-gray-200">#</th>
                        {headers.map((key) => (
                          <th 
                            key={key} 
                            onClick={() => handleSort(key)}
                            className="p-4 cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap font-bold border-b border-gray-200 min-w-[150px] text-gray-700"
                          >
                            <div className="flex items-center gap-1">
                              {key.replace(/_/g, ' ')}
                              {sortConfig?.key === key && (
                                <span className="text-[10px] ml-1 text-[#E4007C]">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {filteredData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                          <td className="p-4 text-center text-gray-400 font-mono text-xs font-medium">{idx + 1}</td>
                          {headers.map((key) => (
                            <td key={`${idx}-${key}`} className="p-4 whitespace-nowrap text-gray-700 border-r border-gray-50 last:border-0">
                              {row[key] || <span className="text-gray-300 italic text-xs">-</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center text-gray-400 text-xs px-2 font-medium">
              <span>Displaying {filteredData.length} records</span>
              <span>Data source: SheetDB</span>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;