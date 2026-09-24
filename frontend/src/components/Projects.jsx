import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, RefreshCw, AlertTriangle, QrCode } from 'lucide-react';
import { fetchProjects } from '../api.js';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOfflineFallback, setIsOfflineFallback] = useState(false);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const result = await fetchProjects();
      setProjects(result.projects);
      setIsOfflineFallback(!!result.isOfflineFallback);
    } catch (err) {
      console.error(err);
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

        {isOfflineFallback && (
          <div className="mb-6 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Loaded cached projects. Express API is starting or offline.</span>
            </div>
            <button onClick={loadProjects} className="underline font-semibold">
              Retry
            </button>
          </div>
        )}

        <div className="space-y-8">
          {projects.map((project, idx) => {
            const isParking = project.title.toLowerCase().includes('parking');
            const isRentWise = project.title.toLowerCase().includes('rentwise');

            return (
              <article
                key={project._id || project.id || idx}
                className="p-6 rounded-xl bg-white border border-stone-200/90 shadow-xs hover:border-stone-300 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-stone-400">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                        {project.title}
                      </h3>
                      <span className="px-2 py-0.5 text-[11px] font-medium rounded bg-stone-100 text-stone-700 border border-stone-200">
                        {isRentWise ? 'Full-Stack MERN' : isParking ? 'IoT / QR Concept' : 'Problem Solving'}
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 rounded-md transition-colors"
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
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {isParking && (
                  <div className="mt-4 p-3 rounded-lg bg-[#FAF8F5] border border-amber-200/70 text-stone-800 text-xs flex items-start gap-2.5">
                    <QrCode className="w-4 h-4 text-[#C25E2E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-stone-900">Key Working Mechanism:</strong> An already parked vehicle scans a unique QR code designated to its specific parking bay, immediately registering real-time occupancy on the system.
                    </div>
                  </div>
                )}

                {project.features && project.features.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                      Key Highlights:
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
      </div>
    </section>
  );
};
