import Navbar from "@/components/navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import DesignDevelopment from "@/components/DesignDevelopment";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <DesignDevelopment />
      <TechStack />
      <Process />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}