'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Properties() {
  const [properties] = useState([
    {
      id: 1,
      name: "Pool Villa",
      location: "Manik - Phuket",
      description:
        "Discover the epitome of contemporary living in our sleek and chic modern stylish apartments.",
      img: "/images/pool.jpg",
    },
    {
      id: 2,
      name: "Cafe",
      location: "Mueang - Phuket",
      description:
        "Experience the perfect blend of sophistication and urban living in our cutting-edge contemporary apartments.",
      img: "/images/pro1.jpg",
    },
  ]);

  return (
    <main className="min-h-screen bg-sky-50">
     

      {/* Cover */}
      <section
        className="relative bg-cover bg-center h-[400px] rounded-xl overflow-hidden shadow-lg mx-4 md:mx-8 mt-5"
        style={{ backgroundImage: "url('/images/inte.jpg')" }}
      >
        <div className="absolute inset-0 bg-slate-800 opacity-60"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold">
              Explore Our Project
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-4xl mx-auto">
              Discover your dream with us – luxurious, stylish,
              and conveniently located.
            </p>
          </div>
        </div>
      </section>

      {/* Properties */}
      <section className="bg-sky-800 rounded-xl shadow-lg mx-4 md:mx-8 mt-5 mb-10">
        <div className="container mx-auto py-10">
          {properties.map((property) => (
            <div
              key={property.id}
              className="mb-12 bg-white p-6 rounded-lg shadow-md border"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <img
                    src={property.img}
                    alt={property.name}
                    className="w-full rounded-lg"
                  />
                </div>

                <div className="md:w-1/2 space-y-4">
                  <h3 className="text-3xl font-semibold text-gray-900">
                    {property.name}
                  </h3>
                  <p className="text-gray-500 uppercase text-sm">
                    {property.location}
                  </p>
                  <p className="text-gray-700">
                    {property.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2024 UTO Advance Engineering. All rights reserved.
          </p>

          <div className="mt-4 flex justify-center space-x-6">
            {["Instagram"].map((platform) => (
              <a
                key={platform}
                href="https://www.instagram.com/uto_advance_engineering/"
                className="text-gray-400 hover:text-sky-400 transition"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
