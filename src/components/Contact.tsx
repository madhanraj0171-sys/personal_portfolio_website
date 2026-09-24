import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2, Copy, Check } from 'lucide-react';
import { sendContactMessage } from '../api';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const directEmail = 'madhanraj0171@gmail.com';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error' || status === 'success') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setResponseMsg('Please fill in all the fields.');
      return;
    }

    setStatus('submitting');
    setResponseMsg('');

    try {
      const res = await sendContactMessage(formData);
      setStatus('success');
      setResponseMsg(res.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setStatus('error');
      setResponseMsg(err.message || 'Something went wrong while sending your message. Please try again.');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C25E2E]">
            05 / Get In Touch
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Contact Me
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Feel free to send a message regarding project collaborations, internships, or engineering discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Direct Student Contacts */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-5 rounded-xl bg-white border border-stone-200/90 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-4">
                Connect Directly
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <span className="text-xs text-stone-400 block mb-1">Email Address</span>
                  <div className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200">
                    <a
                      href={`mailto:${directEmail}`}
                      className="text-xs sm:text-sm font-medium text-stone-900 hover:text-[#C25E2E] truncate"
                    >
                      {directEmail}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1 rounded text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors ml-2 shrink-0 cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* GitHub */}
                <div>
                  <span className="text-xs text-stone-400 block mb-1">GitHub Profile</span>
                  <a
                    href="https://github.com/madhanrajb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200 text-stone-800 hover:border-stone-300 hover:text-[#C25E2E] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-stone-700" />
                      <span className="text-xs sm:text-sm font-medium">github.com/madhanrajb</span>
                    </div>
                    <span className="text-xs text-stone-400">&rarr;</span>
                  </a>
                </div>

                {/* LinkedIn */}
                <div>
                  <span className="text-xs text-stone-400 block mb-1">LinkedIn Profile</span>
                  <a
                    href="https://linkedin.com/in/madhanrajb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200 text-stone-800 hover:border-stone-300 hover:text-[#C25E2E] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-stone-700" />
                      <span className="text-xs sm:text-sm font-medium">linkedin.com/in/madhanrajb</span>
                    </div>
                    <span className="text-xs text-stone-400">&rarr;</span>
                  </a>
                </div>
              </div>

              {/* Student status indicator */}
              <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
                <p>
                  <strong>Availability:</strong> Available for summer 2025/2026 internships, open-source projects, and technical hackathons.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="md:col-span-7">
            <div className="p-6 rounded-xl bg-white border border-stone-200/90 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Have a question, feedback, or an opportunity? Leave your details below.
              </p>

              {/* Status Alerts */}
              {status === 'success' && (
                <div className="mb-6 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block">Message Sent!</strong>
                    <span>{responseMsg}</span>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block">Submission Error</strong>
                    <span>{responseMsg}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name <span className="text-[#C25E2E]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    disabled={status === 'submitting'}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C25E2E] focus:border-[#C25E2E] transition-colors disabled:opacity-60"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Email <span className="text-[#C25E2E]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. johndoe@example.com"
                    disabled={status === 'submitting'}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C25E2E] focus:border-[#C25E2E] transition-colors disabled:opacity-60"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-stone-700 mb-1">
                    Message <span className="text-[#C25E2E]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your note, question, or project inquiry..."
                    disabled={status === 'submitting'}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C25E2E] focus:border-[#C25E2E] transition-colors disabled:opacity-60 resize-y"
                  />
                </div>

                <div className="pt-2 flex items-center justify-start">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#C25E2E] hover:bg-[#A94F24] rounded-lg shadow-sm transition-colors disabled:opacity-70 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
