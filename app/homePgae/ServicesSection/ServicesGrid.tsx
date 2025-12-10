"use client";

import React from "react";
import ServiceCard from "./ServiceCard";
import { servicesData } from "./servicesData";

const ServicesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-full lg:mr-0 lg:ml-auto relative z-10 order-3 lg:order-0">
      {servicesData.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          description={service.description}
          image={service.image}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
