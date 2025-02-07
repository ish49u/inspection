"use client";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";

// Type definitions for the state objects
interface Request {
  _id: string;
  customerName: string;
  status: string;
  date: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  damageDescription: string;
  inspectionDate: string;
  inspectionTime: string;
  formattedDate?: string;
  customer: string;
  address: string;
  mobileNumber: number;
}

interface Earnings {
  month: string;
  amount: number;
}

interface Availability {
  date: string;
  time: string;
}

const inspectorId = "65f3a5c8f3a1a3b5b8e3d4a2"; // Replace with dynamic ID

const InspectorPortal = () => {
  const [currentSection, setCurrentSection] = useState<string>("requests");
  const [requests, setRequests] = useState<Request[]>([]);
  const [availability, setAvailability] = useState<Availability>({
    date: "",
    time: "",
  });
  const [earnings, setEarnings] = useState<Earnings[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");

  useEffect(() => {
    fetchRequests();
  }, []);
  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/inspection");
      const data = await res.json();

      // Ensure all requests have a default status of "pending"
      const updatedRequests = data.map((req: Request) => {
        const formattedDate = req.inspectionDate
          ? formatDate(new Date(req.inspectionDate))
          : "";
        return {
          ...req,
          customer: req.customerName || "Unknown Customer",
          status: req.status || "Pending", // Default status is pending
          formattedDate,
          address: req.address,
          mobileNumver: req.mobileNumber, // Add the formatted date to the request object
        };
      });

      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error fetching inspection requests:", error);
    }
  };

  const updateStatus = async (requestId: string, newStatus: string) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this request as ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/inspection/${requestId}`, // API Endpoint
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }), // Send new status
        }
      );

      if (res.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === requestId ? { ...req, status: newStatus } : req
          )
        );

        Swal.fire({
          title: "Updated!",
          text: `Request has been marked as ${newStatus}.`,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to update status.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
      });
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      Swal.fire("Error", "Please select a file.", "error");
      return;
    }

    if (!selectedRequestId) {
      Swal.fire(
        "Error",
        "Please select a request for which you're uploading the report.",
        "error"
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch(
        `http://localhost:5000/api/reports/${inspectorId}/${selectedRequestId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        Swal.fire("Success", "Report uploaded successfully!", "success");
        setSelectedFile(null);
      } else {
        Swal.fire("Error", "Failed to upload report.", "error");
      }
    } catch (error) {
      console.error("Error uploading report:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Last two digits of the year

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-4">Inspector Portal</h1>
      <nav className="mb-8">
        <button
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setCurrentSection("requests")}
        >
          Manage Requests
        </button>

        <button
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setCurrentSection("reports")}
        >
          Upload Reports
        </button>
      </nav>

      {currentSection === "requests" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Inspection Requests</h2>
          {requests.length > 0 ? (
            <ul className="space-y-4">
              {requests.map((req) => (
                <li
                  key={req._id}
                  className="p-4 bg-white shadow rounded border flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Customer:</strong> {req.customer}
                    </p>
                    <p>
                      <strong>Status:</strong> {req.status}
                    </p>

                    <p>
                      <strong>Date:</strong> {req.formattedDate}
                    </p>
                    <p>
                      <strong>Address:</strong> {req.address}
                    </p>
                    <p>
                      <strong>Mobile No.:</strong> {req.mobileNumber}
                    </p>
                  </div>

                  <div>
                    {req.status !== "approved" &&
                      req.status !== "cancelled" &&
                      req.status !== "closed" && (
                        <>
                          <button
                            onClick={() => updateStatus(req._id, "approved")}
                            className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(req._id, "cancelled")}
                            className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => updateStatus(req._id, "closed")}
                            className="px-4 py-2 bg-gray-500 text-white rounded"
                          >
                            Close
                          </button>
                        </>
                      )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No inspection requests found.</p>
          )}
        </div>
      )}

      {currentSection === "reports" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload Reports</h2>

          <div className="mb-4">
            <label htmlFor="requestSelection" className="block">
              Select Request:
            </label>
            <select
              id="requestSelection"
              onChange={(e) => setSelectedRequestId(e.target.value)}
              value={selectedRequestId}
              className="px-4 py-2 border rounded"
            >
              <option value="">-- Select a Request --</option>
              {requests.map((req) => (
                <option key={req._id} value={req._id}>
                  {req.customer} - {req.formattedDate}
                </option>
              ))}
            </select>
          </div>

          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="mb-4"
          />
          <button
            onClick={handleFileUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
      )}

      {currentSection === "earnings" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Earnings</h2>
          {earnings.length > 0 ? (
            <ul className="space-y-4">
              {earnings.map((earn, index) => (
                <li key={index} className="p-4 bg-white shadow rounded border">
                  <p>
                    <strong>Month:</strong> {earn.month}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${earn.amount}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No earnings data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InspectorPortal;
