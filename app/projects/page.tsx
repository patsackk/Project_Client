'use client';

import React, { useState } from 'react';
import Link from "next/link";
import PageHero from "@/components/PageHero";


export default function ProjectsPage() {
  const properties = [
    { id: "1", name: "Pool Villa", location: "Manik - Phuket", img: "/images/pool.jpg", projectType: "Residential" },
    { id: "2", name: "Cafe", location: "Mueang - Phuket", img: "/images/pro1.jpg", projectType: "Commercial" },
    { id: "3", name: "Luxury Villa", location: "Thalang - Phuket", img: "/images/project3.jpg", projectType: "Residential" },
    { id: "4", name: "Dental Clinic", location: "Thalang - Phuket", img: "/images/dental3.jpg", projectType: "Commercial" },
    { id: "5", name: "Dermatology Clinic", location: "Thalang - Phuket", img: "/images/Drpat3.jpg", projectType: "Commercial" },
    { id: "6", name: "Boutique Villa", location: "Thalang - Phuket", img: "/images/wood1.jpg", projectType: "Residential" },
  ];

  const [selectedType, setSelectedType] = useState("All");

  const filteredProperties =
    selectedType === "All"
      ? properties
      : properties.filter(p => p.projectType === selectedType);

  return (
    <>
      <PageHero
        image="/images/inte.jpg"
        title="Our Projects"
        subtitle="Residential and Commercial engineering works."
      />

      {/* ===== Type Toggle ===== */}
      <section className="mt-10 flex flex-wrap justify-center gap-3 px-6">
        {["All", "Residential", "Commercial"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={selectedType === type ? "btn-primary" : "btn-secondary"}
          >
            {type}
          </button>
        ))}
      </section>

      {/* ===== Projects Grid ===== */}
      <section className="max-w-6xl mx-auto px-6 mt-10 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredProperties.map((property) => {
        const isResidential = property.projectType === "Residential";

        return (
          <Link
            key={property.id}
            href={`/projects/${property.id}`}
            className="block"
          >
            <div className="card overflow-hidden transition hover:shadow-xl">

              <div className="relative h-52 overflow-hidden">
                <img
                  src={property.img}
                  alt={property.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />

                <span
                  className={`absolute top-3 left-3 px-4 py-1 text-xs font-semibold rounded-full text-white
                    ${isResidential ? "bg-sky-600" : "bg-slate-700"}
                  `}
                >
                  {property.projectType}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {property.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {property.location}
                </p>
              </div>

            </div>
          </Link>
        );
      })}


        </div>
      </section>

    </>
  );
}
