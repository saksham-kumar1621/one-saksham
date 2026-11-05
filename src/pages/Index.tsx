import React from "react";
import { Hero } from "../components/Hero";
import { TechStackSection } from "../components/TechStackSection";
import { SelectedWorks } from "../components/SelectedWorks";
import { Explorations } from "../components/Explorations";
import { Stats } from "../components/Stats";

export const Index: React.FC = () => {
  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Tech Stack Bento (Harmonized with Portfolio Design Language) */}
      <TechStackSection />

      {/* 3. Featured Works / Projects (Bento Grid) */}
      <SelectedWorks />

      {/* 4. Visual Explorations / Parallax Gallery */}
      <Explorations />

      {/* 5. Metrics & Experience Stats */}
      <Stats />
    </div>
  );
};

export default Index;
