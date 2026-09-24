import React from 'react';
import { Terminal, Monitor, Server, Database, Wrench } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: { name: string; note?: string }[];
}

export const Skills: React.FC = () => {
  const categories: SkillCategory[] = [
    {
      title: 'Programming Languages',
      icon: Terminal,
      skills: [
        { name: 'Java', note: 'Core OOP, Collections, File I/O' },
        { name: 'C', note: 'Memory concepts, pointers, syntax' },
        { name: 'JavaScript', note: 'ES6+, Async/Await, DOM' },
      ],
    },
    {
      title: 'Frontend Development',
      icon: Monitor,
      skills: [
        { name: 'HTML', note: 'Semantic markup, forms, accessibility' },
        { name: 'CSS', note: 'Flexbox, CSS Grid, Responsive design' },
        { name: 'React.js', note: 'Components, Hooks, State management' },
      ],
    },
    {
      title: 'Backend Development',
      icon: Server,
      skills: [
        { name: 'Node.js', note: 'Runtime environment, modules, npm' },
        { name: 'Express.js', note: 'REST APIs, Middleware, Routing' },
      ],
    },
    {
      title: 'Database Management',
      icon: Database,
      skills: [
        { name: 'MongoDB', note: 'NoSQL collections, Mongoose schemas, queries' },
      ],
    },
    {
      title: 'Tools & Workflow',
      icon: Wrench,
      skills: [
        { name: 'Git', note: 'Version control, branch workflows' },
        { name: 'GitHub', note: 'Repositories, pull requests, collaboration' },
        { name: 'VS Code', note: 'Primary editor, debugging, extensions' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E2E]">
            02 / Capabilities
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Technical Skills
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Technologies and tools I work with across college coursework, problem solving, and personal projects.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-5 rounded-lg bg-stone-50/70 border border-stone-200 hover:border-stone-300 transition-colors"
              >
                <div className="flex items-center gap-2.5 pb-3 border-b border-stone-200/80">
                  <span className="p-1.5 rounded bg-stone-100 text-[#C25E2E]">
                    <Icon className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm font-bold text-stone-900">{cat.title}</h3>
                </div>

                <ul className="mt-3 space-y-2.5">
                  {cat.skills.map((skill) => (
                    <li key={skill.name} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-stone-800">
                          {skill.name}
                        </span>
                      </div>
                      {skill.note && (
                        <span className="text-[11px] text-stone-500 font-normal">
                          {skill.note}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Learning Note */}
        <div className="mt-8 p-4 rounded-lg bg-stone-100/70 border border-stone-200 text-xs text-stone-600 flex items-center justify-between flex-wrap gap-2">
          <span>
            <strong className="text-stone-800">Current Academic Term:</strong> Completing Lab exercises in Object Oriented Programming &amp; Data Structures in Java.
          </span>
          <span className="text-[#C25E2E] font-medium font-mono">CSE Department</span>
        </div>
      </div>
    </section>
  );
};
