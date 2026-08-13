import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Work from "@/components/Work";
import Designs from "@/components/Designs";
import Now from "@/components/Now";
import Playground from "@/components/Playground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />

      <section id="home" className="relative">
        <Hero />
      </section>

      <Marquee
        items={[
          "Available for work",
          "Design",
          "Development",
          "Motion",
          "India-based",
          "2026",
        ]}
      />

      <section id="about" className="relative">
        <About />
      </section>

      <section id="work" className="relative">
        <Work />
      </section>

      <section id="designs" className="relative">
        <Designs />
      </section>

      <Now />

      <Playground />

      <section id="contact" className="relative">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
