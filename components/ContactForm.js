import React from "react";

const ContactForm = () => {
  return (
    <section className="py-16 bg-sky-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Contact Us
        </h2>
        <h3 className="text-xl text-center text-gray-600 mb-8">
          Schedule an Appointment with Us
        </h3>
        <form className="max-w-xl mx-auto bg-white p-10 rounded-lg shadow-lg">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-lg font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Enter your message"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm "
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-sky-700 text-white font-semibold rounded-lg text-lg hover:bg-gray-400 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
