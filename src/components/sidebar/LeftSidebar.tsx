"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { mockIncidents, calculateDollarLossPerHour } from "@/lib/mockData";
import { AlertTriangle, Factory, Wind, CheckCircle2, AlertCircle, TrendingDown, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export function LeftSidebar() {
  const { selectedIncident, setSelectedIncident, setMapViewport } = useStore();
  const [activeTab, setActiveTab] = useState<"incidents" | "financial" | "heatmap">("incidents");

  const handleSelect = (incident: typeof mockIncidents[0]) => {
    setSelectedIncident(incident);
    setMapViewport([incident.latitude, incident.longitude], 12);
  };

  return (
    <div className="w-96 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 h-full flex flex-col shrink-0 z-10">
      <div className="p-4 border-b border-slate-800">
        <div className="flex bg-slate-950 rounded-lg p-1">
          <button 
            onClick={() => setActiveTab("incidents")}
            className={cn("flex-1 py-1.5 rounded-md text-sm font-medium transition-colors", activeTab === "incidents" ? "bg-indigo-500/20 text-indigo-400" : "text-slate-400 hover:text-slate-300")}
          >
            Active Incidents
          </button>
          <button 
            onClick={() => setActiveTab("financial")}
            className={cn("flex-1 py-1.5 rounded-md text-sm font-medium transition-colors", activeTab === "financial" ? "bg-indigo-500/20 text-indigo-400" : "text-slate-400 hover:text-slate-300")}
          >
            Financial
          </button>
          <button 
            onClick={() => setActiveTab("heatmap")}
            className={cn("flex-1 py-1.5 rounded-md text-sm font-medium transition-colors", activeTab === "heatmap" ? "bg-indigo-500/20 text-indigo-400" : "text-slate-400 hover:text-slate-300")}
          >
            Heatmap
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {activeTab === "incidents" && mockIncidents.map((incident) => {
          const isSelected = selectedIncident?.id === incident.id;
          const isCritical = incident.status === "Critical";
          
          return (
            <div
              key={incident.id}
              onClick={() => handleSelect(incident)}
              className={cn(
                "group cursor-pointer rounded-lg border p-4 transition-all duration-200 relative overflow-hidden",
                isSelected 
                  ? "bg-slate-800/80 border-indigo-500 shadow-lg shadow-indigo-900/20" 
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
              )}
            >
              {isCritical && (
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="bg-rose-500 text-white text-[10px] font-bold py-1 px-8 absolute top-3 -right-6 rotate-45">
                    CRITICAL
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-slate-200 text-sm truncate max-w-[200px]">{incident.facilityName}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <Factory className="w-3 h-3" />
                    <span>{incident.operator}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-slate-950/50 rounded p-2 border border-slate-800/50">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Leak Velocity</div>
                  <div className="text-slate-200 font-mono text-sm">{incident.massFlowRate} <span className="text-xs text-slate-500">kg/hr</span></div>
                </div>
                <div className="bg-slate-950/50 rounded p-2 border border-slate-800/50">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Loss / Hour</div>
                  <div className="text-amber-400 font-mono text-sm">${calculateDollarLossPerHour(incident.massFlowRate)}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Δ +{((incident.downwindConcentration - incident.upwindConcentration) / incident.upwindConcentration * 100).toFixed(1)}%</span>
                </div>
                <div className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium",
                  incident.attributionConfidence > 90 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                )}>
                  {incident.attributionConfidence > 90 ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {incident.attributionConfidence}% Match
                </div>
              </div>
            </div>
          );
        })}

        {activeTab === "financial" && (
          <div className="text-slate-400 text-sm p-4 text-center border border-slate-800 rounded-lg bg-slate-900/50 flex flex-col items-center gap-3">
            <TrendingDown className="w-8 h-8 text-slate-600" />
            <p>Financial impact analytics are currently being calculated in the background.</p>
            <p className="text-xs text-slate-500">Check the individual incident details for exact hourly loss metrics.</p>
          </div>
        )}

        {activeTab === "heatmap" && (
          <div className="text-slate-400 text-sm p-4 text-center border border-slate-800 rounded-lg bg-slate-900/50 flex flex-col items-center gap-3">
            <Layers className="w-8 h-8 text-slate-600" />
            <p>Infrastructure Heatmap data is synchronizing with orbital nodes.</p>
            <p className="text-xs text-slate-500">Please use the Overlay Controls on the map to toggle visibility.</p>
          </div>
        )}
      </div>
    </div>
  );
}
