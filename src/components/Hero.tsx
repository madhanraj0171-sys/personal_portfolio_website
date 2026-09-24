import React from 'react';
import { ArrowDown, Mail, Github, Linkedin, Code2, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Student Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-[#C25E2E]"></span>
          <span>B.E. Computer Science & Engineering &bull; II Year (CSE-C)</span>
        </div>

        {/* Primary Name and Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-tight">
          Madhan Raj B.
        </h1>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-lg sm:text-xl font-medium text-stone-700">
          <span>Computer Science Engineering Student</span>
          <span className="text-stone-400 font-normal">&bull;</span>
          <span className="text-[#C25E2E] font-semibold">Aspiring Software Engineer</span>
        </div>

        {/* Natural Student Introduction */}
        <p className="mt-6 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
          I am a Computer Science Engineering student interested in software development, problem solving, and building practical applications.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#C25E2E] hover:bg-[#A94F24] rounded-lg shadow-sm transition-colors"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/80 border border-stone-300/80 rounded-lg transition-colors"
          >
            Contact Me
          </a>

          {/* Quick Social / External Links */}
          <div className="flex items-center gap-2 ml-1 text-stone-500">
            <a
              href="https://github.com/madhanrajb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/madhanrajb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:madhanraj0171@gmail.com"
              aria-label="Send Email"
              className="p-2 rounded-lg hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="Email: madhanraj0171@gmail.com"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Current Focus Note */}
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#C25E2E]" />
            <span>Core focus: Java &bull; Data Structures &bull; Full-Stack MERN</span>
          </div>
          <div className="text-stone-400">
            Chennai, India &bull; Open for Internships & Projects
          </div>
        </div>
      </div>
    </section>
  );
};
