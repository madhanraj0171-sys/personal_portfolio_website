import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, RefreshCw, AlertTriangle, Layers, QrCode, CheckCircle2, ChevronRight } from 'lucide-react';
import { fetchProjects } from '../api';
import { ProjectItem } from '../types';

interface ProjectsProps {
  onOpenAdmin?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenAdmin }) => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineFallback, setIsOfflineFallback] = useState<boolean>(false);

  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchProjects();
      setProjects(result.projects);
      setIsOfflineFallback(!!result.isOfflineFallback);
    } catch (err: any) {
      console.error('Projects load failed:', err);
      setError(err.message || 'Unable to fetch projects from API.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-16 sm:py-20 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E2E]">
            03 / Work &amp; Practice
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Featured Projects
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Projects developed to apply web development principles and algorithmic problem solving.
          </p>
        </div>

        {/* Offline Fallback Notice (if backend API is unavailable) */}
        {isOfflineFallback && (
          <div className="mb-6 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Displaying cached student projects. Backend API is currently starting or offline.
              </span>
            </div>
            <button
              onClick={loadProjects}
              className="underline font-semibold hover:text-amber-950 shrink-0"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && projects.length === 0 && (
          <div className="py-12 text-center">
            <div className="inline-block w-7 h-7 border-2 border-stone-300 border-t-[#C25E2E] rounded-full animate-spin"></div>
            <p className="mt-3 text-xs text-stone-500 font-mono">Loading projects from Express API...</p>
          </div>
        )}

        {/* Projects List */}
        <div className="space-y-8">
          {projects.map((project, idx) => {
            const isParking = project.title.toLowerCase().includes('parking');
            const isRentWise = project.title.toLowerCase().includes('rentwise');
            const isAlgorithms = project.title.toLowerCase().includes('algorithm');

            return (
              <article
                key={project._id || project.id || idx}
                className="p-6 rounded-xl bg-white border border-stone-200/90 shadow-xs hover:border-stone-300 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Title & Badge */}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-stone-400">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-0.5 text-[11px] font-medium rounded bg-stone-100 text-stone-700 border border-stone-200">
                          {isRentWise
                            ? 'Full-Stack MERN'
                            : isParking
                            ? 'IoT / QR Concept'
                            : 'Problem Solving'}
                        </span>
                      )}
                    </div>

                    <p className="mt-2.5 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
                      {project.description}
                    </p>
                  </div>

                  {/* External Links: GitHub & Live Demo */}
                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 rounded-md transition-colors"
                        title={`View ${project.title} on GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#C25E2E] hover:bg-[#A94F24] rounded-md transition-colors"
                        title={`Live Demo for ${project.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Special Highlight Concept for Parking */}
                {isParking && (
                  <div className="mt-4 p-3 rounded-lg bg-[#FAF8F5] border border-amber-200/70 text-stone-800 text-xs flex items-start gap-2.5">
                    <QrCode className="w-4 h-4 text-[#C25E2E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-stone-900">Key Working Mechanism:</strong> An already parked vehicle scans a unique QR code designated to its specific parking bay, immediately registering real-time occupancy on the central Express server.
                    </div>
                  </div>
                )}

                {/* Features List */}
                {project.features && project.features.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                      Key Highlights &amp; Implementations:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                      {project.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C25E2E]/80 shrink-0"></span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Badges */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-stone-400 mr-1">Stack:</span>
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs rounded bg-stone-100 text-stone-700 border border-stone-200/70 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* Note on Extensibility */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 bg-stone-50 p-4 rounded-lg border border-stone-200 gap-2">
          <span>
            API endpoints configured at <code className="font-mono text-stone-700">/api/projects</code>. Admin keys can be used to insert or update projects.
          </span>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-[#C25E2E] font-medium hover:underline shrink-0"
            >
              Open Project Manager &rarr;
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
