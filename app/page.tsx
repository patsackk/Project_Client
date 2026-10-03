'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

  const services = [
    { id: 1, name: "Electrical System", img: "/images/elec.jpg" },
    { id: 2, name: "Water Supply System", img: "/images/water.jpg" },
    { id: 3, name: "Air Conditioning System", img: "/images/airr.jpg" },
    { id: 4, name: "Design and Drafting", img: "/images/design.jpg" },
    { id: 5, name: "Home System Design", img: "/images/plan1.jpg" }
  ];

  const heroImages = [
    '/images/project1.jpg',
    '/images/project2.jpg',
    '/images/project3.jpg',
    '/images/project4.jpg',
  ];


useEffect(() => {
  const storedUsername = localStorage.getItem("username");
  setUsername(storedUsername);
}, []);

useEffect(() => {
  const handleStorageChange = () => {
    const updatedUsername = localStorage.getItem("username");
    setUsername(updatedUsername);
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);
  return (
    <div>

      {/* ===== HERO SLIDER ===== */}
      <section id="home" className="relative h-[600px]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-full"
        >
          {heroImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div
                className="relative h-[600px] bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


       {/* HERO TEXT */}
        <div className="absolute inset-0 z-10 flex items-center justify-center text-white text-center pointer-events-none">
          <div className="pointer-events-auto">
            <h1 className="text-4xl md:text-6xl font-bold">
              Find Your Dream <span className="text-sky-400">Home</span>
            </h1>
            <p className="mt-4 text-lg max-w-xl mx-auto">
              Discover luxurious tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WELCOME MESSAGE ===== */}
      {username && (
        <section className="py-12 bg-sky-700">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Welcome back, <span className="text-sky-200">{username}</span>
            </h2>
            <p className="text-lg text-sky-100">
              We are glad to have you back with us.
            </p>
          </div>
        </section>
      )}

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="section-title mb-10">
            Our <span className="accent">Services</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="card overflow-hidden transition hover:shadow-xl"
              >
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <Link href={`/services/${service.id}`} className="btn-primary mt-4">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
