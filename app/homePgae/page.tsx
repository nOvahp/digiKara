import React from "react";
import Hero from "./Hero";
import FeaturesCard from "./FeaturesCard";
import Features from "./Features";

import Challenges from "./Challenges";
import Solutions from "./Solutions";
import Metrics from "./Metrics";
import Services from "./Services";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Features />
      <Challenges />
      <Solutions />
      <Metrics />
      <Services />
    </main>
  );
}
