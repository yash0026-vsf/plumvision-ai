export interface Incident {
  id: string;
  facilityName: string;
  operator: string;
  infrastructureType: string;
  latitude: number;
  longitude: number;
  massFlowRate: number; // kg/hr
  peakConcentration: number; // ppb
  baselineConcentration: number; // ppb
  windSpeed: number; // km/h
  windBearing: number; // degrees
  upwindConcentration: number;
  downwindConcentration: number;
  coPollutants: {
    so2: "High" | "Moderate" | "Low" | "Trace";
    no2: "High" | "Moderate" | "Low" | "Trace";
  };
  thermalFlareStatus: {
    temperature: number; // °C
    isLit: boolean;
  };
  attributionConfidence: number; // percentage
  status: "Critical" | "Moderate" | "Low";
  complianceStatus: "Compliant" | "Violation" | "Under Review";
}

export const mockIncidents: Incident[] = [
  {
    id: "INC-001",
    facilityName: "Jamnagar Refinery Complex",
    operator: "Reliance Industries",
    infrastructureType: "Flare Stack",
    latitude: 22.3486,
    longitude: 69.8787,
    massFlowRate: 1800,
    peakConcentration: 3400,
    baselineConcentration: 1850,
    windSpeed: 25,
    windBearing: 110,
    upwindConcentration: 1840,
    downwindConcentration: 3120,
    coPollutants: { so2: "High", no2: "Trace" },
    thermalFlareStatus: { temperature: 420, isLit: false },
    attributionConfidence: 94,
    status: "Critical",
    complianceStatus: "Violation",
  },
  {
    id: "INC-002",
    facilityName: "Hazira Industrial Zone",
    operator: "Essar Steel",
    infrastructureType: "Compressor Station",
    latitude: 21.1114,
    longitude: 72.6394,
    massFlowRate: 1200,
    peakConcentration: 2800,
    baselineConcentration: 1800,
    windSpeed: 15,
    windBearing: 85,
    upwindConcentration: 1790,
    downwindConcentration: 2600,
    coPollutants: { so2: "Low", no2: "Moderate" },
    thermalFlareStatus: { temperature: 150, isLit: true },
    attributionConfidence: 87,
    status: "Moderate",
    complianceStatus: "Under Review",
  },
  {
    id: "INC-003",
    facilityName: "Permian Basin Sector 7",
    operator: "Pioneer Natural Resources",
    infrastructureType: "Pipeline Flange",
    latitude: 31.8457,
    longitude: -102.3676,
    massFlowRate: 450,
    peakConcentration: 2200,
    baselineConcentration: 1850,
    windSpeed: 12,
    windBearing: 270,
    upwindConcentration: 1860,
    downwindConcentration: 2150,
    coPollutants: { so2: "Trace", no2: "Low" },
    thermalFlareStatus: { temperature: 35, isLit: false },
    attributionConfidence: 98,
    status: "Low",
    complianceStatus: "Compliant",
  },
  {
    id: "INC-004",
    facilityName: "Gulf Coast LNG Terminal",
    operator: "Cheniere Energy",
    infrastructureType: "Compressor Station",
    latitude: 29.7423,
    longitude: -93.8569,
    massFlowRate: 1550,
    peakConcentration: 3100,
    baselineConcentration: 1900,
    windSpeed: 20,
    windBearing: 180,
    upwindConcentration: 1910,
    downwindConcentration: 2950,
    coPollutants: { so2: "Moderate", no2: "High" },
    thermalFlareStatus: { temperature: 280, isLit: true },
    attributionConfidence: 91,
    status: "Critical",
    complianceStatus: "Violation",
  },
];

export const METHANE_PRICE_PER_MMBTU = 3.20;
// Rough conversion: 1 kg CH4 is approx 0.05 MMBtu
export const calculateDollarLossPerHour = (massFlowRate: number) => {
  return (massFlowRate * 0.05 * METHANE_PRICE_PER_MMBTU).toFixed(2);
};

export const calculateCO2e = (massFlowRate: number) => {
  // GWP of methane over 20 years is ~82.5, but we can use an arbitrary conversion for UI
  return (massFlowRate * 24 * 82.5 / 1000).toFixed(1); // tons per day
};

export function createPlumeGeoJSON(incident: Incident): GeoJSON.FeatureCollection {
  // Simple algorithm to generate an elliptical polygon pointing downwind
  // Bearing 0 means wind is blowing FROM north TO south.
  // Wait, bearing typically is where wind blows FROM. 
  // Let's assume bearing is where wind blows TO for simplicity in this mock, or FROM? 
  // Let's assume standard meteorological (FROM). So plume goes towards (bearing + 180) % 360.
  const toRadians = (deg: number) => deg * (Math.PI / 180);
  
  const plumeDirection = (incident.windBearing + 180) % 360;
  const dirRad = toRadians(plumeDirection);
  
  // Plume length proportional to wind speed and mass flow
  const lengthDeg = (incident.windSpeed * 0.001) + (incident.massFlowRate * 0.00002);
  const widthDeg = lengthDeg * 0.3; // Fan out
  
  const points: number[][] = [];
  
  // Origin
  points.push([incident.longitude, incident.latitude]);
  
  // Right side of plume
  points.push([
    incident.longitude + Math.sin(dirRad + 0.3) * lengthDeg,
    incident.latitude + Math.cos(dirRad + 0.3) * lengthDeg
  ]);
  
  // Center tip of plume
  points.push([
    incident.longitude + Math.sin(dirRad) * (lengthDeg * 1.2),
    incident.latitude + Math.cos(dirRad) * (lengthDeg * 1.2)
  ]);
  
  // Left side of plume
  points.push([
    incident.longitude + Math.sin(dirRad - 0.3) * lengthDeg,
    incident.latitude + Math.cos(dirRad - 0.3) * lengthDeg
  ]);
  
  // Close polygon
  points.push([incident.longitude, incident.latitude]);

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          intensity: incident.massFlowRate,
        },
        geometry: {
          type: "Polygon",
          coordinates: [points],
        },
      },
    ],
  };
}
