import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [projectRefreshKey, setProjectRefreshKey] = useState(0);

  const handleCloseAdmin = () => setIsAdminOpen(false);
  const handleProjectChanged = () => setProjectRefreshKey((prev) => prev + 1);

  // Keyboard shortcut Ctrl+Shift+A to toggle admin modal without cluttering public UI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#242424]">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects key={projectRefreshKey} />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin / API Tester Modal (accessible via Ctrl+Shift+A) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        onProjectChanged={handleProjectChanged}
      />
    </div>
  );
}
