"use client";
import Header from "../Navbar/page";
import React from "react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted!"); // Replace with actual submission logic
  };

  return (
    <>
      <Header />
      <section className="min-h-screen bg-gray-100 py-12 text-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Get in Touch:</h2>
              <ul className="space-y-4">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:support@vehicleinspectionservices.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@vehicleinspectionservices.com
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a
                    href="tel:+18005551234"
                    className="text-blue-600 hover:underline"
                  >
                    +1-800-555-1234
                  </a>
                </li>
                <li>Address: 123 Auto Lane, Car City, USA</li>
              </ul>
              <h2 className="text-xl font-bold mt-6">Social Media Links:</h2>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Contact Form:</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold mb-2"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold mb-2"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold mb-2"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full border border-gray-300 rounded-md p-2"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
