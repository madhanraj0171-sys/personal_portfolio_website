import React from 'react';
import { Code, Layers, Server, Lightbulb } from 'lucide-react';

export const About = () => {
  const interests = [
    {
      title: 'Java & OOP Concepts',
      desc: 'Writing structured, maintainable code using object-oriented principles such as encapsulation, inheritance, and polymorphism.',
      icon: Code,
    },
    {
      title: 'Data Structures & Algorithms',
      desc: 'Strengthening problem-solving fundamentals through consistent practice with arrays, linked lists, recursion, trees, and algorithmic complexity.',
      icon: Layers,
    },
    {
      title: 'Full-Stack Web Development',
      desc: 'Building responsive web interfaces with React and creating REST APIs using Node.js, Express, and MongoDB.',
      icon: Server,
    },
    {
      title: 'Practical Software Projects',
      desc: 'Turning theoretical concepts into functional applications that address real-world workflows like rental management and parking systems.',
      icon: Lightbulb,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E2E]">
            01 / Background
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            About Me
          </h2>
        </div>

        <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed">
          <p>
            Hello! I am <span className="font-semibold text-stone-900">Madhan Raj B.</span>, currently in my second year pursuing a Bachelor of Engineering (B.E.) in Computer Science and Engineering (Section CSE-C).
          </p>
          <p>
            Throughout my coursework and self-directed practice, I have developed a strong interest in core programming with <span className="font-medium text-stone-900">Java</span>, exploring <span className="font-medium text-stone-900">Data Structures and Algorithms</span>, and grasping solid <span className="font-medium text-stone-900">Object-Oriented Programming (OOP)</span> principles.
          </p>
          <p>
            Beyond academic fundamentals, I actively practice full-stack web development using modern JavaScript, React, Node.js, and MongoDB. My main motivation is building reliable, real-world software projects that solve practical problems, rather than just writing standalone exercises. I enjoy understanding how the front-facing user interface talks to backend servers, how databases persist state, and how clean code makes systems easier to maintain.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-4">
            Key Academic & Development Interests
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {interests.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-4 rounded-lg bg-stone-50/80 border border-stone-200/90">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="p-1.5 rounded bg-stone-100 text-[#C25E2E]">
                      <Icon className="w-4 h-4" />
                    </span>
                    <h4 className="font-semibold text-stone-900 text-sm">{item.title}</h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pl-8">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
