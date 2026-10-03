'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

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

  useEffect(() => {
    const prefill = new URLSearchParams(window.location.search).get('message');
    if (prefill) {
      setFormData((prev) => ({ ...prev, message: prefill }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      toast.error('All fields are required.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error('Please enter a valid email address.');
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

      toast.success('Message sent! We’ll get back to you soon.');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      {/* CONTACT FORM */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="page-title">
              Contact <span className="accent">Us</span>
            </h1>
            <p className="text-gray-500 mt-3">
              Fill in the form below and we’ll get back to you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card p-8 md:p-10 space-y-5">
            <div>
              <label htmlFor="name" className="label">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="label">Phone</label>
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+66 xxx xxx xxx"
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Send us your questions or project details.."
                className="input resize-none"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* MAP */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="section-title mb-8">
            Our <span className="accent">Location</span>
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.451978783118!2d98.37348220000001!3d7.9521561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3050311b9804bf87%3A0x4ce5c660456e245!2sUTO%20Advance%20Engineering!5e0!3m2!1sen!2sth!4v1770464729523!5m2!1sen!2sth"
            className="w-full h-[400px] rounded-2xl shadow-sm border border-gray-200"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
      {/* ===== CONTACT INFO ===== */}
      <section id="contact-info" className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="section-title mb-3">
            Contact <span className="accent">Info</span>
          </h2>
          <p className="text-gray-500 mb-10">
            We’d love to hear from you. Reach out anytime through the channels below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 transition hover:shadow-xl">
              <Phone className="mx-auto mb-4 text-sky-600" size={32} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">
                +66 98 947 9155 <br />
                +66 98 764 7897
              </p>
            </div>

            <div className="card p-8 transition hover:shadow-xl">
              <Mail className="mx-auto mb-4 text-sky-600" size={32} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm break-all">utoadvance@gmail.com</p>
            </div>

            <div className="card p-8 transition hover:shadow-xl">
              <MapPin className="mx-auto mb-4 text-sky-600" size={32} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Office</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                119/110 Setthasiri (Koh Kaew)<br />
                Mueang, Phuket 83000
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
