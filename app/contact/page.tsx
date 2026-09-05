'use client';

import { useState } from 'react';
import Link from 'next/link';

type FormDataType = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      alert('All fields are required.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      alert('Form submitted successfully!');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again');
    }
  };

  return (
    <div>
      

      {/* CONTACT FORM */}
      <section className="py-24 bg-gradient-to-b from-slate-200 to-white">
        <div className="w-full max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-sky-700 mb-4">
            Contact Us
          </h1>

          <p className="text-gray-500 mb-12">
            Fill in the form below and we’ll get back to you soon.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-gray-200 p-10 md:p-14 shadow-lg"
          >
            {/* Name */}
            <div className="mb-6 text-left">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-xl border border-gray-300 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-6 text-left">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+66 xxx xxx xxx"
                className="w-full rounded-xl border border-gray-300 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-6 text-left">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                required
              />
            </div>

            {/* Message */}
            <div className="mb-8 text-left">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Send us your questions or project details.."
                className="w-full rounded-xl border border-gray-300 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-sky-600 to-sky-800 py-4 text-white text-sm font-semibold shadow-md hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* MAP */}
      <section className="py-2 bg-white">
        <div className="w-full max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
            Our <span className="text-sky-700">Location</span>
          </h2>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.451978783118!2d98.37348220000001!3d7.9521561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3050311b9804bf87%3A0x4ce5c660456e245!2sUTO%20Advance%20Engineering!5e0!3m2!1sen!2sth!4v1770464729523!5m2!1sen!2sth"
            className="w-full h-[400px] rounded-2xl shadow-lg"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>


      {/* ===== CONTACT INFO ===== */}
        <section
          id="contact-info"
          className="py-20 bg-gradient-to-br from-slate-200 via-white to-sky-50"
        >
          <div className="container mx-auto px-6 max-w-4xl text-center">

            {/* Title */}
            <h3 className="text-4xl font-extrabold text-gray-800 mb-4">
              Contact <span className="text-sky-600">Info</span>
            </h3>

            <p className="text-gray-600 mb-12 text-lg">
              We’d love to hear from you. Reach out anytime through the channels below.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Phone */}
              <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
                <div className="text-sky-600 text-4xl mb-4">📞</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Phone
                </h4>
                <p className="text-gray-600 text-sm">
                  +66 98 947 9155 <br />
                  +66 98 764 7897
                </p>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
                <div className="text-sky-600 text-4xl mb-4">✉️</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Email
                </h4>
                <p className="text-gray-600 text-sm break-all">
                  utoadvance@gmail.com
                </p>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
                <div className="text-sky-600 text-4xl mb-4">📍</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Office
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  119/110 Setthasiri (Koh Kaew)<br />
                  Mueang, Phuket 83000
                </p>
              </div>

            </div>
          </div>
        </section>



      <footer className="bg-gray-800 text-white py-8 text-center">
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
      </footer>
    </div>
  );
}
