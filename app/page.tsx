import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navbar />
      <HeroSection />
      <FeatureGrid />
      <Footer />
    </main>
  );
}
