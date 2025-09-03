import Hero from "./components/Hero/Hero";
import FieldScroller from "./components/FieldScroller";
import TechShowcase from "./components/TechShowcase";
import DataFlowPath from "./components/DataFlowPath";
import FitMatrix from "./components/FitMatrix";
import BlackIntroSection from "./components/blackIntroSection";
import { FooterCTA } from "./components/FooterCTA";

export default function App() {
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
