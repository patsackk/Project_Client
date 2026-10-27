'use client';

import React, { useState } from 'react';
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/components/LanguageProvider";
import type { PortfolioItem } from "@/lib/content";

export default function ProjectsView({ properties }: { properties: PortfolioItem[] }) {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState("All");

  const typeLabel: Record<string, string> = {
    All: t("All", "ทั้งหมด"),
    Residential: t("Residential", "ที่พักอาศัย"),
    Commercial: t("Commercial", "เชิงพาณิชย์"),
  };

  const filteredProperties =
    selectedType === "All"
      ? properties
      : properties.filter(p => p.type === selectedType);

  return (
    <>
      <PageHero
        image="/images/inte.jpg"
        title={t("Our Projects", "ผลงานของเรา")}
        subtitle={t("Residential and Commercial engineering works.", "งานวิศวกรรมสำหรับที่พักอาศัยและอาคารเชิงพาณิชย์")}
      />

      {/* ===== Type Toggle ===== */}
      <section className="mt-10 flex flex-wrap justify-center gap-3 px-6">
        {["All", "Residential", "Commercial"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={selectedType === type ? "btn-primary" : "btn-secondary"}
          >
            {typeLabel[type]}
          </button>
        ))}
      </section>

      {/* ===== Projects Grid ===== */}
      <section className="max-w-6xl mx-auto px-6 mt-10 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredProperties.map((property) => {
        const isResidential = property.type === "Residential";

        return (
          <Link
            key={property.id}
            href={`/projects/${property.id}`}
            className="block"
          >
            <div className="card overflow-hidden transition hover:shadow-xl">

              <div className="relative h-52 overflow-hidden">
                <img
                  src={property.coverImage}
                  alt={property.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />

                <span
                  className={`absolute top-3 left-3 px-4 py-1 text-xs font-semibold rounded-full text-white
                    ${isResidential ? "bg-sky-600" : "bg-slate-700"}
                  `}
                >
                  {typeLabel[property.type] ?? property.type}
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
