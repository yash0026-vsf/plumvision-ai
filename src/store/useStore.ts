import { create } from "zustand";
import { Incident } from "@/lib/mockData";

interface AppState {
  selectedIncident: Incident | null;
  setSelectedIncident: (incident: Incident | null) => void;
  
  layers: {
    methaneHeatmap: boolean;
    infrastructureLines: boolean;
    windVectors: boolean;
    thermalHotspots: boolean;
  };
  toggleLayer: (layer: keyof AppState["layers"]) => void;
  
  mapViewport: {
    center: [number, number];
    zoom: number;
  };
  setMapViewport: (center: [number, number], zoom: number) => void;
}

export const useStore = create<AppState>((set) => ({
  selectedIncident: null,
  setSelectedIncident: (incident) => set({ selectedIncident: incident }),
  
  layers: {
    methaneHeatmap: true,
    infrastructureLines: true,
    windVectors: true,
    thermalHotspots: false,
  },
  toggleLayer: (layer) => 
    set((state) => ({
      layers: {
        ...state.layers,
        [layer]: !state.layers[layer],
      }
    })),
    
  mapViewport: {
    center: [22.3486, 69.8787], // Default to Jamnagar
    zoom: 4,
  },
  setMapViewport: (center, zoom) => set({ mapViewport: { center, zoom } }),
}));
