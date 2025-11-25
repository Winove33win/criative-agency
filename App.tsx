import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Work } from './pages/Work';
import { ProjectDetail } from './pages/ProjectDetail';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DataProvider } from './context/DataContext';

// Scroll to top helper component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read directly from localStorage on every render to ensure freshness
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <div className="bg-[#050505] min-h-screen text-white overflow-hidden selection:bg-fuchsia-500 selection:text-white flex flex-col font-sans">
          
          <Routes>
            {/* Public Routes - Wrapped in Navbar/Footer */}
            <Route path="/" element={<><Navbar /><main className="flex-grow"><Home /></main><Footer /></>} />
            <Route path="/services" element={<><Navbar /><main className="flex-grow"><Services /></main><Footer /></>} />
            <Route path="/work" element={<><Navbar /><main className="flex-grow"><Work /></main><Footer /></>} />
            <Route path="/work/:slug" element={<><Navbar /><main className="flex-grow"><ProjectDetail /></main><Footer /></>} />
            <Route path="/contact" element={<><Navbar /><main className="flex-grow"><Contact /></main><Footer /></>} />

            {/* Admin Routes - No Public Navbar */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Fallback route */}
            <Route path="*" element={<><Navbar /><div className="h-screen flex flex-col items-center justify-center"><h1 className="text-4xl font-bold mb-4">404</h1><a href="#/" className="text-fuchsia-500 hover:underline">Go Home</a></div><Footer /></>} />
          </Routes>

        </div>
      </Router>
    </DataProvider>
  );
};

export default App;