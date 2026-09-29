import { Header } from "@/components/layout/Header";
import { LeftSidebar } from "@/components/sidebar/LeftSidebar";
import { RightDrawer } from "@/components/inspector/RightDrawer";
import { MapWrapper } from "@/components/map/MapWrapper";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
      <Header />
      <main className="flex-1 flex overflow-hidden relative">
        <LeftSidebar />
        <div className="flex-1 relative">
          <MapWrapper />
          <RightDrawer />
        </div>
      </main>
    </div>
  );
}
