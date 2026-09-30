"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useStore } from "@/store/useStore";
import { mockIncidents, createPlumeGeoJSON } from "@/lib/mockData";

// Fix leaflet icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom div icon for pulse effect
const createPulseIcon = (status: string) => {
  const colorClass = status === "Critical" ? "bg-rose-500" : status === "Moderate" ? "bg-amber-500" : "bg-emerald-500";
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div class="relative flex h-4 w-4 transform -translate-x-1/2 -translate-y-1/2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-75"></span>
        <span class="relative inline-flex rounded-full h-4 w-4 ${colorClass} border-2 border-slate-900"></span>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

function MapUpdater() {
  const map = useMap();
  const { mapViewport } = useStore();

  useEffect(() => {
    map.flyTo(mapViewport.center, mapViewport.zoom, {
      duration: 1.5,
      easeLinearity: 0.25,
    });
  }, [mapViewport, map]);

  return null;
}

export default function MapContent() {
  const { layers, setSelectedIncident, mapViewport } = useStore();

  return (
    <MapContainer
      center={mapViewport.center}
      zoom={mapViewport.zoom}
      zoomControl={false}
      style={{ width: "100%", height: "100%", background: "#0f172a" }}
    >
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
      />
      <MapUpdater />

      {mockIncidents.map((incident) => (
        <div key={incident.id}>
          {layers.infrastructureLines && (
            <Marker
              position={[incident.latitude, incident.longitude]}
              icon={createPulseIcon(incident.status)}
              eventHandlers={{
                click: () => {
                  setSelectedIncident(incident);
                },
              }}
            >
              <Popup className="custom-popup">
                <div className="font-semibold text-slate-100">{incident.facilityName}</div>
                <div className="text-xs text-slate-400">{incident.infrastructureType}</div>
              </Popup>
            </Marker>
          )}

          {layers.methaneHeatmap && (
            <GeoJSON
              data={createPlumeGeoJSON(incident)}
              style={() => ({
                color: incident.status === "Critical" ? "#f43f5e" : "#f59e0b",
                weight: 0,
                fillOpacity: 0.4,
                fillColor: incident.status === "Critical" ? "url(#gradient-critical)" : "url(#gradient-mod)",
              })}
              eventHandlers={{
                click: () => {
                  setSelectedIncident(incident);
                },
              }}
            />
          )}
        </div>
      ))}

      {/* SVG Definitions for GeoJSON gradients (hacky but works for map overlays sometimes, though Leaflet SVG styling is tricky) */}
      <svg width="0" height="0">
        <defs>
          <radialGradient id="gradient-critical">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#e11d48" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </MapContainer>
  );
}
