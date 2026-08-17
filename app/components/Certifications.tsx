"use client";

import React from "react";
import { Award, Calendar, ShieldCheck, Check } from "lucide-react";
import { motion } from "framer-motion";

interface CertItem {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

const CERTS: CertItem[] = [
  {
    title: "Salesforce Application Developer & Administrator",
    issuer: "Salesforce",
    date: "Jun 2024",
    credentialId: "LC-83921-99",
  },
  {
    title: "AWS Academy Graduate - Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    date: "Oct 2025",
    credentialId: "AWS-GRAD-99411",
  },
  {
    title: "System Design & Architecture Certified",
    issuer: "DevAcademy",
    date: "Jun 2026",
    credentialId: "DA-SYS-ARCH-410",
  }
];

const Certifications: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-2 select-none">
      {CERTS.map((cert, index) => (
        <motion.div
          key={cert.title}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="p-4 bg-white/60 dark:bg-stone-900/40 backdrop-blur-md rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck size={15} />
              </div>
              <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                Verified
              </span>
            </div>
            <h4 className="text-xs font-bold text-stone-800 dark:text-stone-150 leading-snug line-clamp-2">
              {cert.title}
            </h4>
            <p className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 mt-1">
              {cert.issuer}
            </p>
          </div>

          <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between text-[9px] text-stone-400 dark:text-stone-500">
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {cert.date}
            </span>
            {cert.credentialId && (
              <span className="font-mono bg-stone-100 dark:bg-stone-850 px-1.5 py-0.5 rounded border border-stone-200/50 dark:border-stone-800/50">
                ID: {cert.credentialId}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Certifications;
