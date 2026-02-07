'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    { id: 1, name: 'Electrical System', img: '/images/elec.jpg' },
    { id: 2, name: 'Water Supply System', img: '/images/water.jpg' },
    { id: 3, name: 'Air Conditioning System', img: '/images/airr.jpg' },
    { id: 4, name: 'Design and Drafting', img: '/images/design.jpg' },
  ];

  const heroImages = [
    '/images/project1.jpg',
    '/images/project2.jpg',
    '/images/project3.jpg',
    '/images/project4.jpg',
  ];

  useEffect(() => {
  const syncAuth = () => {
    setUsername(localStorage.getItem('username'));
  };

  syncAuth(); // โหลดครั้งแรก
  window.addEventListener('auth-change', syncAuth);

  return () => {
    window.removeEventListener('auth-change', syncAuth);
  };
}, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    //setUsername(null);
    window.dispatchEvent(new Event('auth-change'));
    setIsMobileMenuOpen(false);
    router.push('/login');
  };

  return (
    <div>
  
      {/* ===== HERO SLIDER ===== */}
      <section className="relative h-[600px]">
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
                {/* overlay */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ===== HERO TEXT (does NOT block dots) ===== */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-5xl font-extrabold">
              Find Your Dream <span className="text-sky-400">Home</span>
            </h1>
            <p className="mt-4">
              Discover luxurious projects tailored to your lifestyle
            </p>
          </div>
        </div>
      </section>


      {/* ===== WELCOME ===== */}
      {username && (
        <section className="py-12 bg-sky-600 text-white text-center">
          <h2 className="text-3xl font-bold">
            Welcome back, <span className="text-black">{username}</span>
          </h2>
        </section>
      )}

      {/* ===== SERVICES ===== */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Service Overview</h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow hover:scale-105 transition"
              >
                <img
                  src={service.img}
                  alt={service.name}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">
                    {service.name}
                  </h3>
                  <Link href={`/services/${service.id}`}>
                    <button className="mt-4 px-6 py-2 bg-sky-900 text-white rounded-full">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
    </div>
  );
}
