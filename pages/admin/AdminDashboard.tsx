import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData, Project } from '../../context/DataContext';
import { Plus, Trash2, Edit, Save } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { projects, services, deleteProject, deleteService, addProject, updateProject } = useData();
  const [view, setView] = useState<'projects' | 'services'>('projects');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Editor State (Simplified for demo)
  const [editForm, setEditForm] = useState<any>({});

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSave = () => {
    if (view === 'projects') {
      if (projects.find(p => p.id === editingId)) {
        updateProject(editingId!, editForm);
      } else {
        addProject({ ...editForm, id: Date.now().toString(), slug: editForm.client.toLowerCase().replace(/ /g, '-') });
      }
    } 
    // Services save logic would go here
    setEditingId(null);
    setEditForm({});
  };

  const handleCreateNew = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      slug: 'new-project',
      client: 'New Client',
      category: 'Branding',
      type: 'Brand Identity',
      stats: 'TBD',
      heroImg: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop',
      year: '2024',
      services: ['Strategy'],
      challenge: 'Challenge description...',
      solution: 'Solution description...',
      gallery: [],
      results: [{ label: 'Metric', value: '100%' }]
    };
    setEditForm(newProject);
    setEditingId(newProject.id); // Triggers modal mode
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Admin Header */}
      <header className="border-b border-white/10 bg-zinc-900/50 p-6 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
        <h1 className="text-2xl font-bold font-['Syne']">NEON<span className="text-fuchsia-500">ADMIN</span></h1>
        <div className="flex items-center gap-6">
          <nav className="flex gap-4 text-sm font-medium">
            <button 
              onClick={() => setView('projects')} 
              className={`px-4 py-2 rounded-full transition-colors ${view === 'projects' ? 'bg-fuchsia-600 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Projects ({projects.length})
            </button>
            <button 
              onClick={() => setView('services')} 
              className={`px-4 py-2 rounded-full transition-colors ${view === 'services' ? 'bg-cyan-600 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Services ({services.length})
            </button>
          </nav>
          <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300">LOGOUT</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto w-full flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-['Syne'] uppercase">{view} Management</h2>
          <button 
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-fuchsia-400 transition-all"
          >
            <Plus className="w-4 h-4" /> Add New {view === 'projects' ? 'Project' : 'Service'}
          </button>
        </div>

        {/* List View */}
        <div className="grid grid-cols-1 gap-4">
          {view === 'projects' ? projects.map(p => (
            <div key={p.id} className="bg-zinc-900 border border-white/5 p-6 rounded-xl flex items-center justify-between group hover:border-white/20 transition-all">
              <div className="flex items-center gap-6">
                <img src={p.heroImg} alt={p.client} className="w-16 h-16 object-cover rounded-lg bg-black" />
                <div>
                  <h3 className="text-xl font-bold">{p.client}</h3>
                  <p className="text-zinc-500 text-sm">{p.type} • {p.year}</p>
                </div>
              </div>
              <div className="flex gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(p)} className="p-2 hover:bg-white/10 rounded-full text-cyan-400"><Edit className="w-5 h-5" /></button>
                <button onClick={() => deleteProject(p.id)} className="p-2 hover:bg-white/10 rounded-full text-red-500"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
          )) : services.map(s => (
            <div key={s.id} className="bg-zinc-900 border border-white/5 p-6 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-white/10">
                   {/* Simplified icon render */}
                   <div className="text-xs text-zinc-500">ICON</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="text-zinc-500 text-sm line-clamp-1">{s.desc}</p>
                </div>
              </div>
               <div className="flex gap-4 opacity-50 hover:opacity-100 transition-opacity">
                 {/* Simplified service edit for now */}
                 <button onClick={() => deleteService(s.id)} className="p-2 hover:bg-white/10 rounded-full text-red-500"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Edit Modal Overlay */}
      {editingId && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-2xl bg-[#0a0a0a] border-l border-white/10 h-full overflow-y-auto p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-bold font-['Syne']">Edit {view === 'projects' ? 'Project' : 'Service'}</h2>
               <div className="flex gap-4">
                 <button onClick={() => setEditingId(null)} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
                 <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-fuchsia-600 rounded-full font-bold hover:bg-fuchsia-500">
                    <Save className="w-4 h-4" /> Save
                 </button>
               </div>
            </div>

            <div className="space-y-6">
               <div>
                 <label className="block text-zinc-400 text-sm mb-2 font-mono">CLIENT NAME</label>
                 <div className="flex gap-2">
                   <input
                        type="text"
                        value={editForm.client}
                        onChange={(e) => setEditForm({...editForm, client: e.target.value})}
                        className="w-full bg-zinc-900 border border-white/10 p-3 rounded-lg focus:border-cyan-500 outline-none"
                    />
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-zinc-400 text-sm mb-2 font-mono">CATEGORY</label>
                    <select 
                        value={editForm.category}
                        onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                        className="w-full bg-zinc-900 border border-white/10 p-3 rounded-lg focus:border-cyan-500 outline-none"
                    >
                        <option>Branding</option>
                        <option>Web</option>
                        <option>Social</option>
                        <option>Motion</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-zinc-400 text-sm mb-2 font-mono">YEAR</label>
                    <input 
                        type="text" 
                        value={editForm.year} 
                        onChange={(e) => setEditForm({...editForm, year: e.target.value})}
                        className="w-full bg-zinc-900 border border-white/10 p-3 rounded-lg focus:border-cyan-500 outline-none"
                    />
                 </div>
               </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-2 font-mono">HERO IMAGE URL</label>
                 <input
                    type="text"
                    value={editForm.heroImg}
                    onChange={(e) => setEditForm({...editForm, heroImg: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/10 p-3 rounded-lg focus:border-cyan-500 outline-none text-xs"
                 />
                 {editForm.heroImg && <img src={editForm.heroImg} className="mt-2 w-full h-32 object-cover rounded-lg border border-white/10 opacity-50" />}
               </div>

               <div>
                 <label className="block text-zinc-400 text-sm mb-2 font-mono">CHALLENGE</label>
                 <textarea 
                    rows={4}
                    value={editForm.challenge} 
                    onChange={(e) => setEditForm({...editForm, challenge: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/10 p-3 rounded-lg focus:border-cyan-500 outline-none"
                 />
               </div>

               <div>
                 <label className="block text-zinc-400 text-sm mb-2 font-mono">SOLUTION</label>
                 <textarea 
                    rows={4}
                    value={editForm.solution} 
                    onChange={(e) => setEditForm({...editForm, solution: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/10 p-3 rounded-lg focus:border-cyan-500 outline-none"
                 />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2 font-mono">STATS LABEL</label>
                    <input 
                        type="text" 
                        value={editForm.results?.[0]?.label || ''} 
                        onChange={(e) => {
                            const newResults = [...(editForm.results || [{value: ''}])];
                            newResults[0] = { ...newResults[0], label: e.target.value };
                            setEditForm({...editForm, results: newResults});
                        }}
                        className="w-full bg-zinc-900 border border-white/10 p-3 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2 font-mono">STATS VALUE</label>
                    <input 
                        type="text" 
                        value={editForm.results?.[0]?.value || ''} 
                        onChange={(e) => {
                            const newResults = [...(editForm.results || [{label: ''}])];
                            newResults[0] = { ...newResults[0], value: e.target.value };
                            setEditForm({...editForm, results: newResults});
                        }}
                        className="w-full bg-zinc-900 border border-white/10 p-3 rounded-lg"
                    />
                  </div>
               </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
