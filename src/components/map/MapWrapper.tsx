"use client";

import dynamic from "next/dynamic";
import { Layers } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500">
      Initializing Geospatial Engine...
    </div>
  ),
});

export function MapWrapper() {
  const { layers, toggleLayer } = useStore();

  return (
    <div className="relative w-full h-full bg-slate-900 z-0">
      <MapContent />

      {/* Layer Controls - Floating Bottom Left */}
      <div className="absolute bottom-6 left-6 z-[400] bg-slate-900/90 backdrop-blur border border-slate-800 rounded-lg shadow-2xl p-3 w-48">
        <div className="flex items-center gap-2 text-slate-300 mb-3 border-b border-slate-800 pb-2">
          <Layers className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Overlay Controls</span>
        </div>
        <div className="space-y-2">
          {Object.entries(layers).map(([key, isActive]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer group">
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                isActive ? "bg-indigo-600 border-indigo-600" : "border-slate-600 group-hover:border-slate-500"
              )}>
                {isActive && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <span className="text-xs text-slate-400 group-hover:text-slate-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <input
                type="checkbox"
                className="hidden"
                checked={isActive}
                onChange={() => toggleLayer(key as keyof typeof layers)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
