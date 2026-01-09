import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero } from "./components/Hero";
import { OurStory } from "./components/OurStory";
import { Details } from "./components/Details";
import { Gallery } from "./components/Gallery";
import { RSVP } from "./components/RSVP";
import { Navigation } from "./components/Navigation";
import { AdminRSVPsPage } from "./pages/AdminRSVPsPage";

function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f4]">
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />

      <section id="home">
        <Hero />
      </section>

      <section id="story">
        <OurStory />
      </section>

      <section id="details">
        <Details />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="rsvp">
        <RSVP />
      </section>

      <footer className="bg-[#8b9eb5] text-white py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-sm opacity-90 italic">
            Loved you yesterday, love you still, always have, always will.
          </p>
          <div className="mt-8 text-sm opacity-80">
            <p>© 2026 Sarah & Michael</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/rsvps" element={<AdminRSVPsPage />} />
      </Routes>
    </Router>
  );
}
