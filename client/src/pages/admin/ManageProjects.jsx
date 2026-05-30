import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const ManageProjects = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Projects</h1>
          <p className="text-[var(--text-secondary)]">Manage your portfolio projects</p>
        </div>
        <button className="bg-[var(--accent-primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#e66000] transition-colors shadow-[0_0_15px_var(--accent-glow)]">
          Add Project
        </button>
      </div>
      
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] mb-4">
          <Briefcase size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Projects Coming Soon</h3>
        <p className="text-[var(--text-secondary)] max-w-md">
          The projects management module is currently under development. Check back later!
        </p>
      </div>
    </div>
  );
};

export default ManageProjects;
