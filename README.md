# PlumeVision AI 🛰️

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=flat)
![Leaflet](https://img.shields.io/badge/Maps-React_Leaflet-199900?style=flat&logo=leaflet)

**PlumeVision AI** is a production-ready, full-stack satellite geospatial intelligence and methane leak detection web application. It provides an interactive dashboard to monitor, analyze, and respond to industrial methane super-emitter events using simulated orbital telemetry.

## ✨ Features

- **Interactive Geospatial Engine**: High-contrast dark satellite base map using `react-leaflet` and CartoDB Dark Matter tiles.
- **Dynamic Methane Plumes**: Dynamically rendered GeoJSON polygons visualizing methane plumes fanning downwind based on meteorological data.
- **Real-time Telemetry Dashboard**: Left sidebar tracking active "super-leaks" sorted by emission severity with smooth map-panning interactions.
- **Forensic Inspector Drawer**: Animated right-side panel detailing:
  - Chemical Tracer Chips ($CH_4$, $SO_2$, $NO_2$) for source disambiguation.
  - Thermal Flare Status (detecting unlit flare tips).
  - Real-time financial loss (\$/hr) and environmental impact ($CO_2e$) counters.
- **Automated Action Suite**: Dispatch maintenance crews or issue regulatory compliance notices directly from the dashboard.

## 🛠️ Technology Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a custom slate-950 dark theme.
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Mapping:** [React Leaflet](https://react-leaflet.js.org/)

## 🚀 Getting Started

To run this project locally on your machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yash0026-vsf/PlumeVision_AI.git
   cd PlumeVision_AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## 🧠 Architecture Notes

Currently, the application runs using a **Mock Data Simulation Engine** (`src/lib/mockData.ts`) which mathematically fakes orbital ingest metadata, emission metrics, and chemical disambiguation. This allows the frontend UI to be fully functional, interactive, and deployable as a Proof-of-Concept without requiring a live Machine Learning computer vision pipeline or a PostGIS backend database.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
