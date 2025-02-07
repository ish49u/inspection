"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../Navbar/page";

const RequestInspection: React.FC = () => {
  const [customerName, setCustomerName] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [damageDescription, setDamageDescription] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [inspectionTime, setInspectionTime] = useState("");
  const [documents, setDocuments] = useState<File | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("vehicleMake", vehicleMake);
    formData.append("vehicleModel", vehicleModel);
    formData.append("vehicleYear", vehicleYear);
    formData.append("damageDescription", damageDescription);
    formData.append("inspectionDate", inspectionDate);
    formData.append("inspectionTime", inspectionTime);
    if (documents) {
      formData.append("document", documents);
    }

    try {
      const response = await fetch("http://localhost:5000/api/inspection", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        alert("There was an issue with the submission. Please try again.");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Request an Inspection
          </h2>

          <div className="flex justify-center space-x-8 mb-8">
            <Link
              href="/Customer-Portal"
              className="hover:text-yellow-300 text-lg"
            >
              My Appointments
            </Link>
          </div>

          {!formSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <label
                  htmlFor="customerName"
                  className="block text-lg font-semibold mb-2 text-gray-700"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition ease-in-out duration-300 text-gray-900"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="vehicleMake"
                  className="block text-lg font-semibold mb-2 text-gray-700"
                >
                  Vehicle Make
                </label>
                <input
                  type="text"
                  id="vehicleMake"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition ease-in-out duration-300 text-gray-900"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="vehicleModel"
                  className="block text-lg font-semibold mb-2 text-gray-700"
                >
                  Vehicle Model
                </label>
                <input
                  type="text"
                  id="vehicleModel"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition ease-in-out duration-300 text-gray-900"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="vehicleYear"
                  className="block text-lg font-semibold mb-2 text-gray-700"
                >
                  Vehicle Year
                </label>
                <input
                  type="number"
                  id="vehicleYear"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition ease-in-out duration-300 text-gray-900"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="damageDescription"
                  className="block text-lg font-semibold mb-2 text-gray-700"
                >
                  Description of Damage
                </label>
                <textarea
                  id="damageDescription"
                  value={damageDescription}
                  onChange={(e) => setDamageDescription(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition ease-in-out duration-300 text-gray-900"
                  rows={4}
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="inspectionDate"
                  className="block text-lg font-semibold mb-2 text-gray-700"
                >
                  Preferred Inspection Date
                </label>
                <input
                  type="date"
                  id="inspectionDate"
                  value={inspectionDate}
                  onChange={(e) => setInspectionDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition ease-in-out duration-300 text-gray-900"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="inspectionTime"
                  className="block text-lg font-semibold mb-2 text-gray-700"
                >
                  Preferred Inspection Time
                </label>
                <input
                  type="time"
                  id="inspectionTime"
                  value={inspectionTime}
                  onChange={(e) => setInspectionTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition ease-in-out duration-300 text-gray-900"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="documents"
                  className="block text-lg font-semibold mb-2 text-gray-700"
                >
                  Upload Supporting Documents
                </label>
                <input
                  type="file"
                  id="documents"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition ease-in-out duration-300 text-gray-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition ease-in-out duration-300"
              >
                Submit Your Inspection Request Now
              </button>
            </form>
          ) : (
            <div className="bg-green-100 text-green-800 p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Inspection Request Submitted!
              </h3>
              <p>Thank you, {customerName}! We will contact you soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RequestInspection;
