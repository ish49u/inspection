"use client";
import { ObjectId } from "mongoose";
import React, { useState, useEffect } from "react";
import Header from "../Navbar/page";

// Define a type for a document
interface Document {
  id: string;
  name: string;
  filePath: string;
  uploadedAt: string;
  requestId: ObjectId;
}

// Define a type for an inspection request
interface Inspection {
  id: string;
  status: string;
  date: string;
}

const CustomerPortal = () => {
  const [currentSection, setCurrentSection] = useState("status");
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const token = localStorage.getItem("authToken"); // or get it from context/store
        const response = await fetch(`http://localhost:5000/api/inspection`);
        const data = await response.json();

        // Ensure status defaults to "Pending" if not provided
        const formattedInspections = data.map((insp: any) => ({
          ...insp,
          status: insp.status || "Pending",
        }));

        setInspections(formattedInspections);
      } catch (error) {
        console.error("Error fetching inspections:", error);
      }
    };

    fetchInspections();
  }, []);

  useEffect(() => {
    if (currentSection === "documents") {
      fetchDocuments();
    }
  }, [currentSection]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports`); // Adjust API URL as needed
      const data = await response.json();

      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleDownload = async (reportId: string | undefined) => {
    if (!reportId) {
      console.error("Error: Report ID is undefined");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/reports/download/${reportId}`
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const contentDisposition = response.headers.get("Content-Disposition");
      const fileName =
        contentDisposition?.split("filename=")[1]?.replace(/["']/g, "") ||
        "report.pdf";

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const handleCancel = async (inspectionId: string) => {
    if (!inspectionId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/inspection/${inspectionId}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel the request");
      }

      // Update state to reflect the canceled request
      setInspections((prevInspections) =>
        prevInspections.map((insp) =>
          insp.id === inspectionId ? { ...insp, status: "Cancelled" } : insp
        )
      );
    } catch (error) {
      console.error("Error cancelling inspection:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen p-8 text-black">
        <h1 className="text-2xl font-bold mb-4">Customer Portal</h1>
        <nav className="mb-8">
          <button
            className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setCurrentSection("status")}
          >
            Track Status
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setCurrentSection("documents")}
          >
            Documents
          </button>
        </nav>

        {currentSection === "status" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Inspection Requests</h2>
            <ul className="space-y-4">
              {inspections.map((insp) => (
                <li
                  key={insp.id}
                  className="p-4 bg-white shadow rounded border flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Request ID:</strong> {insp.id}
                    </p>
                    <p>
                      <strong>Status:</strong> {insp.status || "Pending"}
                    </p>
                    <p>
                      <strong>Date:</strong> {insp.date}
                    </p>
                  </div>

                  {/* Show Cancel button only for Pending requests */}
                  {insp.status === "Pending" && (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleCancel(insp.id)}
                    >
                      Cancel
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentSection === "documents" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Uploaded Reports</h2>
            <ul className="space-y-4">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <li
                    key={doc.id}
                    className="p-4 bg-white shadow rounded border flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>Request ID:</strong> {doc.requestId?.toString()}
                        {/* Show Request ID */}
                      </p>
                      <p>
                        <strong>Uploaded At:</strong>{" "}
                        {new Date(doc.uploadedAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDownload(doc.id)}
                    >
                      Download
                    </button>
                  </li>
                ))
              ) : (
                <p>No documents found.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerPortal;
