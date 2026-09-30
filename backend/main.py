from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

from services.satellite_ingest import fetch_satellite_data
from services.ml_pipeline import detect_methane_plumes

load_dotenv()

app = FastAPI(title="PlumeVision AI - Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IncidentResponse(BaseModel):
    id: str
    facilityName: str
    latitude: float
    longitude: float
    massFlowRate: float
    status: str
    geometry: dict # GeoJSON dict for the heatmap

@app.get("/")
def health_check():
    return {"status": "operational", "service": "Methane Detection Engine"}

@app.post("/api/v1/scan", response_model=List[IncidentResponse])
def run_orbital_scan(latitude: float, longitude: float, radius_km: float = 50.0):
    """
    Triggers a live or historical scan over a bounding box using satellite APIs.
    """
    try:
        # 1. Ingest raw raster data (e.g., Sentinel-5P TROPOMI)
        raster_data = fetch_satellite_data(latitude, longitude, radius_km)
        
        # 2. Run the machine learning pipeline to find methane concentrations
        detections = detect_methane_plumes(raster_data)
        
        # 3. Format and return to frontend
        results = []
        for det in detections:
            results.append(IncidentResponse(
                id=f"INC-{det['id']}",
                facilityName="Unknown/Detected",
                latitude=det['lat'],
                longitude=det['lon'],
                massFlowRate=det['flow_rate_kg_hr'],
                status="Critical" if det['flow_rate_kg_hr'] > 1000 else "Moderate",
                geometry=det['geojson_polygon']
            ))
        
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
