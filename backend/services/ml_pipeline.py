import numpy as np

def detect_methane_plumes(raster_data: dict):
    """
    Takes raw raster array (e.g. from Sentinel-5P or EMIT SWIR bands),
    applies a threshold or a U-Net semantic segmentation model to extract
    plumes, and converts them to GeoJSON vectors.
    """
    print("Running Computer Vision model on raster data...")
    
    # In production, you would:
    # 1. Load your trained PyTorch/TensorFlow model
    # 2. Convert raster_data to a normalized tensor
    # 3. Predict mask: mask = model.predict(tensor)
    # 4. Use rasterio.features.shapes to polygonize the mask into GeoJSON
    
    # Mocking the ML output detection based on the input location
    lat_center = (raster_data["bbox"][0] + raster_data["bbox"][2]) / 2
    lon_center = (raster_data["bbox"][1] + raster_data["bbox"][3]) / 2
    
    # Return a generated mock polygon (representing the ML extraction)
    return [
        {
            "id": "ml-det-001",
            "lat": lat_center,
            "lon": lon_center,
            "flow_rate_kg_hr": 1450.0,
            "geojson_polygon": {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [lon_center, lat_center],
                        [lon_center + 0.02, lat_center - 0.01],
                        [lon_center + 0.05, lat_center - 0.02],
                        [lon_center + 0.01, lat_center - 0.03],
                        [lon_center, lat_center]
                    ]]
                }
            }
        }
    ]
