"use client";

import { useState } from "react";
import { Search, Satellite, AlertTriangle, Activity, CloudFog, DownloadCloud, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <Satellite className="w-6 h-6" />
            <span className="font-bold text-xl tracking-tight text-slate-100">PlumeVision AI</span>
          </div>
          <div className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded border border-emerald-500/20 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            LIVE ORBITAL INGEST ACTIVE
          </div>
        </div>

        <div className="flex-1 max-w-xl px-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search coordinates, facility names, or pipeline sectors..."
              className="w-full bg-slate-950 border border-slate-800 rounded-md py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-4 mr-4 text-xs font-medium">
            <div className="flex flex-col items-end">
              <span className="text-slate-500">Active Super-Leaks</span>
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> 3
              </span>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div className="flex flex-col items-end">
              <span className="text-slate-500">24h Revenue Bleed</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Activity className="w-3 h-3" /> $38,420
              </span>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div className="flex flex-col items-end">
              <span className="text-slate-500">CO2e Impact</span>
              <span className="text-slate-300 font-bold flex items-center gap-1">
                <CloudFog className="w-3 h-3" /> 1,420 tons
              </span>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-indigo-900/20"
          >
            <DownloadCloud className="w-4 h-4" />
            Export Audit Package
          </button>
        </div>
      </header>

      {/* Export Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
                <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  Regulatory Audit Package
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-slate-800 rounded-md text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-300">
                  You are about to generate a certified PDF Audit Package containing:
                </p>
                <ul className="text-sm text-slate-400 space-y-2 list-disc pl-5">
                  <li>High-resolution satellite heatmap overlays.</li>
                  <li>Flow rate mathematical proofs and timestamps.</li>
                  <li>Chemical tracer ($CH_4$, $SO_2$, $NO_2$) disambiguation logs.</li>
                  <li>Calculated financial & carbon liabilities.</li>
                </ul>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-3 mt-4 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <p className="text-xs text-amber-400/90 leading-relaxed">
                    This document serves as legal evidence for environmental compliance boards. Please ensure all disambiguation forensics are reviewed.
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert("Downloading PDF Audit Package...");
                    setIsModalOpen(false);
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <DownloadCloud className="w-4 h-4" />
                  Generate PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
