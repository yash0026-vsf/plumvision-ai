"use client";

import { useStore } from "@/store/useStore";
import { X, Send, FileText, Flame, Activity, Car, AlertTriangle } from "lucide-react";
import { calculateCO2e, calculateDollarLossPerHour } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function RightDrawer() {
  const { selectedIncident, setSelectedIncident } = useStore();

  return (
    <AnimatePresence>
      {selectedIncident && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute right-0 top-16 bottom-0 w-[420px] bg-slate-900 border-l border-slate-800 shadow-2xl z-30 flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
            <div>
              <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                Forensic Inspector
                <span className="bg-indigo-500/20 text-indigo-400 text-[10px] px-2 py-0.5 rounded border border-indigo-500/30 uppercase font-bold tracking-wider">
                  {selectedIncident.id}
                </span>
              </h2>
            </div>
            <button 
              onClick={() => setSelectedIncident(null)}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
            
            {/* Facility Dossier */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Facility Dossier</h3>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3">
                <div>
                  <div className="text-slate-100 font-semibold">{selectedIncident.facilityName}</div>
                  <div className="text-slate-400 text-sm">{selectedIncident.operator}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800/50">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Asset Class</div>
                    <div className="text-slate-300 text-sm font-medium">{selectedIncident.infrastructureType}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Coordinates</div>
                    <div className="text-slate-300 text-sm font-mono">{selectedIncident.latitude.toFixed(4)}, {selectedIncident.longitude.toFixed(4)}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[10px] text-slate-500 uppercase mb-1">Permit Compliance Status</div>
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold",
                      selectedIncident.complianceStatus === "Violation" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
                      selectedIncident.complianceStatus === "Under Review" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    )}>
                      {selectedIncident.complianceStatus === "Violation" && <AlertTriangle className="w-3 h-3" />}
                      {selectedIncident.complianceStatus}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Disambiguation Forensic Panel */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Disambiguation Forensics</h3>
              
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-4">
                {/* Differential Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Upwind Inlet</span>
                    <span className="text-slate-400">Downwind Outlet</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex relative">
                    <div className="bg-slate-600 h-full w-1/3"></div>
                    <div className="bg-rose-500 h-full w-2/3"></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1 font-mono">
                    <span className="text-slate-300">{selectedIncident.upwindConcentration} ppb</span>
                    <span className="text-rose-400">{selectedIncident.downwindConcentration} ppb</span>
                  </div>
                  <div className="text-xs text-rose-400/80 mt-1">
                    + {((selectedIncident.downwindConcentration - selectedIncident.upwindConcentration) / selectedIncident.upwindConcentration * 100).toFixed(1)}% Differential
                  </div>
                </div>

                {/* Tracer Chips */}
                <div className="pt-3 border-t border-slate-800/50">
                  <div className="text-[10px] text-slate-500 uppercase mb-2">Chemical Tracer Chips</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2 py-1 rounded text-xs font-medium">CH4: Super-Critical</span>
                    <span className={cn(
                      "border px-2 py-1 rounded text-xs font-medium",
                      selectedIncident.coPollutants.so2 === "High" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-slate-800 border-slate-700 text-slate-400"
                    )}>SO2: {selectedIncident.coPollutants.so2}</span>
                    <span className={cn(
                      "border px-2 py-1 rounded text-xs font-medium",
                      selectedIncident.coPollutants.no2 === "High" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-slate-800 border-slate-700 text-slate-400"
                    )}>NO2: {selectedIncident.coPollutants.no2}</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-400 italic border-l-2 border-indigo-500/50 pl-2">
                    Matches catalytic cracker signature; rules out adjacent nitrogen plant.
                  </div>
                </div>

                {/* Thermal */}
                <div className="pt-3 border-t border-slate-800/50 flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    selectedIncident.thermalFlareStatus.isLit ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  )}>
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">
                      {selectedIncident.thermalFlareStatus.isLit ? "Flare Active & Combusting" : "Unlit Flare Tip Alert"}
                    </div>
                    <div className="text-xs text-slate-400">
                      {selectedIncident.thermalFlareStatus.temperature}°C heat signature detected.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Financial & Climate */}
            <section className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold">Real-time Loss</span>
                </div>
                <div className="text-xl font-mono font-bold text-amber-400">
                  ${calculateDollarLossPerHour(selectedIncident.massFlowRate)}<span className="text-xs text-slate-500 font-sans font-normal">/hr</span>
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Car className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold">CO2e Impact</span>
                </div>
                <div className="text-xl font-mono font-bold text-slate-200">
                  {calculateCO2e(selectedIncident.massFlowRate)}<span className="text-xs text-slate-500 font-sans font-normal"> t/day</span>
                </div>
              </div>
            </section>

          </div>

          {/* Action Suite */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/80">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 transition-colors">
                <Send className="w-4 h-4" />
                <span className="text-xs font-semibold">Dispatch Crew</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg py-3 transition-colors">
                <FileText className="w-4 h-4" />
                <span className="text-xs font-semibold">Issue Notice</span>
              </button>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
