import React from "react";
import Hero from "./Hero";
import FeaturesCard from "./FeaturesCard";
import Features from "./Features";

import Challenges from "./Challenges";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Features />
      <Challenges />
    </main>
  );
}
