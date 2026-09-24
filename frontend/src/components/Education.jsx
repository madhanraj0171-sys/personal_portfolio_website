import React from 'react';
import { Calendar, BookOpen } from 'lucide-react';

export const Education = () => {
  const coursework = [
    'Object-Oriented Programming (Java)',
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Computer Organization & Architecture',
    'Discrete Mathematics',
    'Operating Systems Fundamentals',
  ];

  return (
    <section id="education" className="py-16 sm:py-20 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E2E]">
            04 / Academics
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Education
          </h2>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white border border-stone-200/90 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-[#C25E2E]/10 text-[#C25E2E] mb-2 font-mono">
                  Currently Enrolled
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                  B.E. Computer Science and Engineering
                </h3>
                <p className="text-sm font-medium text-stone-700 mt-0.5">
                  II Year &bull; Section CSE-C
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono sm:pt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>2023 &ndash; 2027</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-stone-600 leading-relaxed">
              Pursuing foundational and intermediate studies in computing, system design principles, software engineering methodologies, and algorithmic analysis. Active in coding practice and hands-on laboratory coursework.
            </p>

            <div className="mt-5 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-[#C25E2E]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Key Coursework &amp; Subject Modules:
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {coursework.map((course) => (
                  <div key={course} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-stone-50/80 border border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <h4 className="text-base font-semibold text-stone-900">
                  Higher Secondary School Certificate (HSC)
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Mathematics, Physics, Chemistry &amp; Computer Science
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>Completed 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
