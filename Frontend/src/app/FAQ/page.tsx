"use client";
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Header from "../Navbar/page";

const FAQSection: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <>
      <Header />
      <section className="py-12 bg-gray-50 text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {/* Customers Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                For Customers
              </h3>
              <div className="space-y-4">
                {[
                  {
                    question: "How do I find an inspector?",
                    answer:
                      "You can find an inspector by searching through our platform's inspector directory or by contacting our support team.",
                  },
                  {
                    question: "How long does the inspection process take?",
                    answer:
                      "The inspection process usually takes 1-2 hours, depending on the complexity of the vehicle and damage.",
                  },
                  {
                    question: "Can I cancel or reschedule my appointment?",
                    answer:
                      "Yes, you can cancel or reschedule your appointment through your account or by contacting support.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                      onClick={() => toggleQuestion(index + 1)}
                    >
                      <span>{faq.question}</span>
                      {selectedQuestion === index + 1 ? (
                        <FaMinus className="text-blue-600" />
                      ) : (
                        <FaPlus className="text-blue-600" />
                      )}
                    </button>
                    {selectedQuestion === index + 1 && (
                      <p className="px-4 pb-4 text-gray-600">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Inspectors Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                For Inspectors
              </h3>
              <div className="space-y-4">
                {[
                  {
                    question: "How do I register on the platform?",
                    answer:
                      "You can register by visiting our 'Register as an Inspector' page and filling out the required details.",
                  },
                  {
                    question: "What is the commission structure?",
                    answer:
                      "Inspectors are paid based on a commission percentage for each inspection completed. Please refer to the platform's terms and conditions for more details.",
                  },
                  {
                    question: "How do I receive payments?",
                    answer:
                      "Payments are processed directly to your bank account or through a payment method chosen during your registration.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index + 4}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                      onClick={() => toggleQuestion(index + 4)}
                    >
                      <span>{faq.question}</span>
                      {selectedQuestion === index + 4 ? (
                        <FaMinus className="text-blue-600" />
                      ) : (
                        <FaPlus className="text-blue-600" />
                      )}
                    </button>
                    {selectedQuestion === index + 4 && (
                      <p className="px-4 pb-4 text-gray-600">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
