import React from "react";
import Hero from "./Hero/Hero";
import FeaturesCard from "./Features/FeaturesCard";
import Features from "./Features/Features";

import Challenges from "./Challenges/Challenges";
import Solutions from "./Solutions/Solutions";
import Metrics from "./Metrices/Metrics";
import ServicesSection from "./ServicesSection/ServicesSection";
import BlogCard from "./Blog/BlogCard";
import Blog from "./Blog/Blog";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Features />
      <Challenges />
      <Solutions />
      <Metrics />
      <ServicesSection />
      <Blog />
    </main>
  );
}
