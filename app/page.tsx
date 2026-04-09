// app/page.tsx
import Hero from "@/components/sections/Hero";
import HowToPlay from "@/components/sections/HowToPlay";
import USSDSimulator from "@/components/sections/USSDSimulator";
import VideoSection from "@/components/sections/VideoSection";
import GroupSection from "@/components/sections/GroupSection";
import WinnersGallery from "@/components/sections/WinnersGallery";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <HowToPlay />
      <USSDSimulator />
      <VideoSection />
      <GroupSection />
      <WinnersGallery />
      <Footer />
    </main>
  );
}
