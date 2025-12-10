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
import Values from "./Values/Values";
import Partners from "./Partners/Partners";
import Quotes from "./Quotes/Quotes";

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
      <Values />
      <Partners />
      <Quotes />
    </main>
  );
}
