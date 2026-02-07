'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if form fields are filled
    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required.");
      return;
    }

    // Ensure email is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log("Form data before submission:", formData); // Debug: check data

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        throw new Error(errorData.message || 'Failed to submit form.');
      }

      const data = await response.json();
      console.log('Form Submitted:', data);
      alert('Form submitted successfully!');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.message || 'An error occurred while submitting the form.');
    }
  };

  return (
    <div>
    

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-sky-700 mb-8">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-12">
            Have any questions? We'd love to hear from you. Fill out the form
            below.
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white p-12 shadow-2xl rounded-xl border border-sky-200"
          >
            {/* Name Input */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out text-lg"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out text-lg"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out text-lg"
                required
              />
            </div>

            {/* Message Input */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 ease-in-out text-lg"
                rows="6"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-sky-700 text-white py-4 px-6 rounded-lg hover:bg-sky-600 focus:outline-none transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Our Locations Section */}
      <section id="locations" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Our Locations</h2>
          <p className="text-gray-700 mb-8">Find us in the most convenient locations around the city.</p>
         <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15805.80792000011!2d98.36320389678427!3d7.952155973683278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3050311b9804bf87%3A0x4ce5c660456e245!2sUTO%20Advance%20Engineering!5e0!3m2!1sen!2sth!4v1770444568537!5m2!1sen!2sth"
          className="w-full h-[400px] rounded-lg shadow-lg border"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Contact Info Section */}
      <section id="contact-info" className="py-12 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Contact Info</h3>
          <p className="text-gray-600 mb-6">We’d love to hear from you. Reach out to us through any of the following:</p>
          <div className="flex flex-col space-y-4 items-center">
            <p className="text-lg font-medium text-gray-700">
              <strong>Phone:</strong> +66 98 947 9155 <br /> +66 98 764 7897
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Email:</strong> Utoadvance@gmail.com
            </p>
            <p className="text-lg font-medium text-gray-700">
              <strong>Office Address:</strong> 119/110 Setthasiri(koh kaew), Mueang, Phuket 83000
            </p>
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
