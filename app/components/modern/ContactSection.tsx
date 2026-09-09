"use client";

import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPaperPlane,
  faCopy,
  faCheck,
  faDownload,
  faTerminal,
  faGlobe,
  faCircleCheck,
  faCircleExclamation,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { IUserData } from "../../types/user-type";

interface ContactProps {
  user?: IUserData;
}

export default function ContactSection({ user }: ContactProps) {
  const emailAddress = user?.contact.email || "suradach.kan@gmail.com";
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await axios.post("/api/sendmail", formData);
      if (response.status === 200) {
        setStatus("success");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage("Unable to send dispatch. Please email me directly.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Service is temporarily unreachable. Please email me directly.");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Transmission Terminal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Get In{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base max-w-2xl font-light">
            Have a project in mind, an engineering opportunity, or wish to discuss
            software architecture? Reach out directly or dispatch a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels & Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Email Card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Direct Email
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-xs font-mono text-cyan-300 border border-slate-700 transition-all"
                  title="Copy to clipboard"
                >
                  <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-xs" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <a
                href={`mailto:${emailAddress}`}
                className="text-base sm:text-lg font-mono font-bold text-white hover:text-cyan-400 transition-colors break-all"
              >
                {emailAddress}
              </a>
              <p className="text-xs text-slate-400 mt-2 font-mono">
                Response typically within 24 hours
              </p>
            </div>

            {/* Social Channels Matrix */}
            <div className="grid grid-cols-2 gap-4">
              {/* GitHub */}
              <a
                href={user?.contact.github || "https://github.com/suradachk"}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-500/40 hover:scale-[1.02] transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white group-hover:text-cyan-400 transition-colors">
                    <FontAwesomeIcon icon={faGithub} className="text-xl" />
                  </div>
                  <span className="text-xs text-cyan-400 font-mono">↗</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">
                    Codebase
                  </span>
                  <span className="font-bold text-white text-sm">GitHub</span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={user?.contact.linkin || "https://www.linkedin.com/in/suradachk"}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-purple-500/40 hover:scale-[1.02] transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                  </div>
                  <span className="text-xs text-purple-400 font-mono">↗</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">
                    Professional
                  </span>
                  <span className="font-bold text-white text-sm">LinkedIn</span>
                </div>
              </a>
            </div>

            {/* Resume Download Card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 flex items-center justify-between group hover:border-emerald-500/40 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FontAwesomeIcon icon={faDownload} className="text-lg" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    Curriculum Vitae (PDF)
                  </h4>
                  <p className="text-xs font-mono text-slate-400">
                    Full Experience & Qualifications
                  </p>
                </div>
              </div>
              <a
                href="/api/resume"
                target="_blank"
                download="suradachk-resume.pdf"
                className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold hover:bg-emerald-500/30 transition-all"
              >
                Download
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Terminal / Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  dispatch_message.sh
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-400">
                PORT 443 / SSL ENCRYPTED
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                >
                  Your Email <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-slate-600"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                >
                  Subject <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Opportunity / Collaboration / Query"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-slate-600"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2"
                >
                  Message Content <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your transmission here..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs font-mono text-emerald-300">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <span>Message dispatched successfully! Thank you.</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs font-mono text-red-300">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-slate-950 font-mono font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
              >
                {status === "loading" ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                    <span>Transmitting Signal...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
