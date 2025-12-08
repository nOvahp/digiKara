"use client";

import React from "react";
import ServiceCard from "./ServiceCard";
import { servicesData } from "./servicesData";

const Services = () => {
  return (
    <section className="w-full flex justify-center items-center py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1280px]">
        {servicesData.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            image={service.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
