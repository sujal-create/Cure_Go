import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import Benefits from "./components/Benefits";
import AmbulanceSection from "./components/AmbulanceSection";

export default function Home() {
  return (
    <main className="bg-slate-950 text-white min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Benefits />
      <AmbulanceSection />
    </main>
  );
}