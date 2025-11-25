import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as initialProjects, services as initialServices } from '../data';

// Types (Mirrors data.ts structure)
export interface Service {
  id: string;
  title: string;
  desc: string;
  icon: any; // Storing the component reference or string name if needed later
  lottieUrl: string;
}

export interface Project {
  id: string;
  slug: string;
  client: string;
  category: string;
  type: string;
  stats: string;
  heroImg: string;
  year: string;
  services: string[];
  challenge: string;
  solution: string;
  gallery: string[];
  results: { label: string; value: string }[];
}

interface DataContextType {
  projects: Project[];
  services: any[]; // Using any for Service because of the Lucide Icon complexity in local storage
  addProject: (p: Project) => void;
  updateProject: (id: string, p: Project) => void;
  deleteProject: (id: string) => void;
  addService: (s: any) => void;
  updateService: (id: string, s: any) => void;
  deleteService: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or fall back to static data
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('neon_flux_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [services, setServices] = useState<any[]>(() => {
    // Services are trickier because they contain Functions (Lucide Icons) which don't JSON.stringify.
    // For this demo, we will largely rely on initialServices for the icons, but allow text updates.
    // In a real app, we'd map icon names to components.
    const saved = localStorage.getItem('neon_flux_services');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Re-attach icons from initial data based on ID matches or defaults
      return parsed.map((s: any) => {
        const original = initialServices.find(os => os.id === s.id);
        return { ...s, icon: original?.icon || initialServices[0].icon };
      });
    }
    return initialServices;
  });

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('neon_flux_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    // Strip icons before saving to avoid circular structure errors
    const simpleServices = services.map(({ icon, ...rest }) => rest);
    localStorage.setItem('neon_flux_services', JSON.stringify(simpleServices));
  }, [services]);

  // --- Actions ---

  const addProject = (p: Project) => setProjects(prev => [...prev, p]);
  
  const updateProject = (id: string, updated: Project) => {
    setProjects(prev => prev.map(p => p.id === id ? updated : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addService = (s: any) => setServices(prev => [...prev, s]);

  const updateService = (id: string, updated: any) => {
    setServices(prev => prev.map(s => s.id === id ? { ...updated, icon: s.icon } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  return (
    <DataContext.Provider value={{ 
      projects, services, 
      addProject, updateProject, deleteProject, 
      addService, updateService, deleteService 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
