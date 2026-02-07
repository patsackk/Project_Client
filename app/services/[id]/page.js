// /app/services/[id]/page.js

import React from 'react';

const servicesData = [
  {
    id: 1,
    name: "Electrical System",
    img: "/images/elec.jpg",
    description: "Our Electrical System services provide reliable and safe installations...",
    gallery: ["/images/elec2.jpg", "/images/elec3.jpg"],
  },
  {
    id: 2,
    name: "Water Supply System",
    img: "/images/water.jpg",
    description: "We ensure clean and efficient water supply systems...",
    gallery: ["/images/water2.jpg", "/images/water8.jpg"],
  },
  {
    id: 3,
    name: "Air Conditioning System",
    img: "/images/airr.jpg",
    description:
      "Our Air Conditioning System services offer cooling solutions tailored to your comfort and energy efficiency needs.",
    gallery: [
      "/images/air2.jpg",
      "/images/air3.jpg",
      "/images/air4.jpg",
      "/images/air5.jpg",
    ],
  },
  {
    id: 4,
    name: "Design and Drafting",
    img: "/images/design.jpg",
    description:
      "Our Design and Drafting services create detailed plans and blueprints tailored to your project's requirements.",
    gallery: [
      "/images/design2.jpg",
      "/images/design3.jpg",
      "/images/design4.jpg",
      "/images/design5.jpg",
    ],
  },
];

export default function ServiceDetail({ params }) {
  const { id } = params;  // This comes from the dynamic segment [id]
  const service = servicesData.find((service) => service.id.toString() === id);

  if (!service) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold text-red-600">Service Not Found</h1>
        <p className="text-lg mt-4">The requested service does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4 lg:px-20">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="relative w-full h-[400px]">
          <img
            src={service.img}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white">{service.name}</h1>
          </div>
        </div>
        <div className="p-8 lg:p-12">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{service.description}</p>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose This Service?</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>High-quality, professional work guaranteed.</li>
              <li>Expert technicians with years of experience.</li>
              <li>Customized solutions for every client.</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${service.name} ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
