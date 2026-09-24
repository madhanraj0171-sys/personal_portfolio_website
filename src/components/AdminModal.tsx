import React, { useState, useEffect } from 'react';
import { X, Key, Database, RefreshCw, Trash2, Plus, MessageSquare, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import { checkApiHealth, fetchContactMessages, createProjectApi, deleteProjectApi, fetchProjects } from '../api';
import { ContactMessage, HealthResponse, ProjectItem } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectChanged?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onProjectChanged }) => {
  const [adminKey, setAdminKey] = useState('student_admin_secret_2025');
  const [activeTab, setActiveTab] = useState<'messages' | 'addProject' | 'health'>('health');
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New project form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    features: '',
    github: '',
    liveDemo: '',
  });

  useEffect(() => {
    if (isOpen) {
      loadHealth();
    }
  }, [isOpen]);

  const loadHealth = async () => {
    setLoading(true);
    try {
      const h = await checkApiHealth();
      setHealthData(h);
    } catch {
      setHealthData(null);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    if (!adminKey) {
      setFeedback({ type: 'error', text: 'Please provide an Admin Key first.' });
      return;
    }
    setLoading(true);
    setFeedback(null);
    try {
      const list = await fetchContactMessages(adminKey);
      setMessages(list);
      setFeedback({ type: 'success', text: `Loaded ${list.length} contact message(s)` });
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message || 'Failed to authenticate with Admin Key.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey) {
      setFeedback({ type: 'error', text: 'Admin Key is required to create projects.' });
      return;
    }
    if (!newProject.title.trim() || !newProject.description.trim()) {
      setFeedback({ type: 'error', text: 'Title and description are required.' });
      return;
    }

    setLoading(true);
    setFeedback(null);
    try {
      await createProjectApi(
        {
          title: newProject.title.trim(),
          description: newProject.description.trim(),
          technologies: newProject.technologies.split(',').map((t) => t.trim()).filter(Boolean),
          features: newProject.features.split('\n').map((f) => f.trim()).filter(Boolean),
          github: newProject.github.trim() || '#',
          liveDemo: newProject.liveDemo.trim() || '#',
        },
        adminKey
      );

      setFeedback({ type: 'success', text: 'Project created successfully via POST /api/projects!' });
      setNewProject({ title: '', description: '', technologies: '', features: '', github: '', liveDemo: '' });
      if (onProjectChanged) onProjectChanged();
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message || 'Failed to create project.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-stone-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C25E2E]" />
            <div>
              <h3 className="font-bold text-stone-900 text-sm">Full-Stack Backend Inspector</h3>
              <p className="text-[11px] text-stone-500 font-mono">Express REST API &amp; MongoDB Controls</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Key Bar */}
        <div className="px-5 py-3 border-b border-stone-100 bg-stone-100/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <Key className="w-4 h-4 text-stone-500 shrink-0" />
            <span className="text-xs font-semibold text-stone-700">ADMIN_KEY:</span>
            <input
              type="text"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="e.g. student_admin_secret_2025"
              className="px-2 py-1 text-xs font-mono bg-white border border-stone-300 rounded flex-1 focus:outline-none focus:border-[#C25E2E]"
            />
          </div>
          <span className="text-[10px] text-stone-500 font-mono self-center">
            Protects POST/PUT/DELETE &amp; GET /api/contact
          </span>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-3 border-b border-stone-200 flex items-center gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('health')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'health'
                ? 'border-[#C25E2E] text-[#C25E2E] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            API Health &amp; DB Status
          </button>
          <button
            onClick={() => {
              setActiveTab('messages');
              loadMessages();
            }}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'messages'
                ? 'border-[#C25E2E] text-[#C25E2E] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Contact Submissions
          </button>
          <button
            onClick={() => setActiveTab('addProject')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'addProject'
                ? 'border-[#C25E2E] text-[#C25E2E] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Add Project (POST)
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`mx-5 mt-3 p-2.5 rounded text-xs flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {/* TAB 1: HEALTH */}
          {activeTab === 'health' && (
            <div className="space-y-4 text-xs text-stone-700">
              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-stone-900 text-sm">Server Diagnostics</span>
                  <button
                    onClick={loadHealth}
                    disabled={loading}
                    className="p-1 rounded hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                    title="Reload Health"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div className="p-2 bg-white rounded border border-stone-200">
                    <span className="text-stone-400 block text-[10px]">API ENDPOINT</span>
                    <span className="font-bold text-stone-800">GET /api/health</span>
                  </div>

                  <div className="p-2 bg-white rounded border border-stone-200">
                    <span className="text-stone-400 block text-[10px]">STATUS</span>
                    <span className="font-bold text-emerald-700">
                      {healthData?.status ? '200 OK (Healthy)' : 'Offline / Checking'}
                    </span>
                  </div>

                  <div className="p-2 bg-white rounded border border-stone-200">
                    <span className="text-stone-400 block text-[10px]">DATABASE ENGINE</span>
                    <span className="font-bold text-stone-800">
                      {healthData?.database === 'connected'
                        ? 'MongoDB (Connected)'
                        : 'In-Memory Store (Resilient Fallback)'}
                    </span>
                  </div>

                  <div className="p-2 bg-white rounded border border-stone-200">
                    <span className="text-stone-400 block text-[10px]">DEVELOPER</span>
                    <span className="font-bold text-stone-800">Madhan Raj B.</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-amber-200/80 rounded-lg text-stone-700">
                <h4 className="font-bold text-stone-900 mb-1">Local &amp; Deployment Architecture</h4>
                <p className="leading-relaxed">
                  This portfolio runs on a full-stack Node.js + Express backend with Mongoose schemas. Even when running offline or without an active MongoDB connection string, an in-memory fallback ensures all APIs (projects listing, contact form) function seamlessly without broken states.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-700">
                  Submissions received via <code className="font-mono">POST /api/contact</code>:
                </span>
                <button
                  onClick={loadMessages}
                  disabled={loading}
                  className="px-2 py-1 text-xs bg-stone-100 border border-stone-200 rounded hover:bg-stone-200 text-stone-700 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-500 bg-stone-50 rounded-lg border border-stone-200">
                  No contact messages found or key has not authenticated yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map((msg, i) => (
                    <div key={msg._id || i} className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                      <div className="flex items-center justify-between font-medium text-stone-900">
                        <span>{msg.name}</span>
                        <span className="text-[11px] text-stone-400 font-mono">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Recent'}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#C25E2E] font-mono mt-0.5">{msg.email}</div>
                      <p className="mt-2 text-stone-700 bg-white p-2 rounded border border-stone-100">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADD PROJECT */}
          {activeTab === 'addProject' && (
            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g. Distributed Task Queue"
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-[#C25E2E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  required
                  rows={2}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Brief overview of the application architecture..."
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-[#C25E2E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    placeholder="Java, Spring Boot, PostgreSQL"
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-[#C25E2E]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Key Features (one per line)</label>
                  <input
                    type="text"
                    value={newProject.features}
                    onChange={(e) => setNewProject({ ...newProject, features: e.target.value })}
                    placeholder="Multi-threading, Queue workers"
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-[#C25E2E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={newProject.github}
                    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-[#C25E2E]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={newProject.liveDemo}
                    onChange={(e) => setNewProject({ ...newProject, liveDemo: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:border-[#C25E2E]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#C25E2E] hover:bg-[#A94F24] text-white font-medium rounded transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Submitting to API...' : 'Create Project (POST /api/projects)'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
