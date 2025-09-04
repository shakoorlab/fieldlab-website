import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero/Hero";
import FieldScroller from "./components/FieldScroller";
import TechShowcase from "./components/TechShowcase";
import DataFlowPath from "./components/DataFlowPath";
import FitMatrix from "./components/FitMatrix";
import BlackIntroSection from "./components/BlackIntroSection";
import { FooterCTA } from "./components/FooterCTA";
import ClimateSmart from "./components/Fields/Climate_Smart/ClimateSmart";
import HPI from "./components/Fields/HPI/HPI";

// Home route composed of your existing sections
function Home() {
  return (
    <>
      <Hero />
      <BlackIntroSection id="next-section" />
      <FieldScroller id="after-black-intro" />
      <TechShowcase />
      <DataFlowPath />
      <FitMatrix />
      <FooterCTA />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fields/hpi" element={<HPI />} />
        <Route path="/fields/climate-smart" element={<ClimateSmart />} />
        <Route
          path="*"
          element={
            <main style={{ padding: 32 }}>
              <h1>Not Found</h1>
              <p>That page doesn’t exist.</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
