"use client";
import React, { useState } from "react";

const InspectionReports: React.FC = () => {
  const [isReportVisible, setIsReportVisible] = useState(false);

  const toggleReportVisibility = () => {
    setIsReportVisible(!isReportVisible);
  };

  const handleDownload = () => {
    alert("Report downloaded!");
    // Implement download logic
  };

  const handleShareWithInsurer = () => {
    alert("Report shared with insurer!");
    // Implement sharing logic
  };

  return (
    <section className="py-12 bg-gray-100 text-black">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Inspection Reports</h2>

        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Report Overview</h3>
          <ul className="list-disc pl-6">
            <li>Damage assessments</li>
            <li>Repair recommendations</li>
            <li>Comparisons with insurance company quotations</li>
          </ul>

          <button
            onClick={toggleReportVisibility}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-6"
          >
            {isReportVisible ? "Hide Report" : "Show Report"}
          </button>

          {isReportVisible && (
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-4">Inspection Report</h4>
              <p>
                Detailed report of the damage and repair recommendations.
                <br />
                Download the full report or share with your insurer.
              </p>
              <button
                onClick={handleDownload}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4"
              >
                Download Report
              </button>
              <button
                onClick={handleShareWithInsurer}
                className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 mt-4 ml-4"
              >
                Share with Insurer
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InspectionReports;
