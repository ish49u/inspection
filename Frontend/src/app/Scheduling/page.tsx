"use client";
import React, { useState } from "react";

const Scheduling: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [customSlot, setCustomSlot] = useState("");

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleCustomSlot = () => {
    if (customSlot) {
      setSelectedSlot(customSlot);
      alert(
        `Custom Slot Selected: ${new Date(customSlot).toLocaleString("en-US", {
          hour12: true,
        })}`
      );
    } else {
      alert("Please select a valid date and time.");
    }
  };

  const handleReschedule = () => {
    alert("Rescheduled");
    // Implement reschedule logic
  };

  const handleCancel = () => {
    alert("Cancelled");
    // Implement cancel logic
  };

  return (
    <section className="py-12 bg-gray-100 text-black">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Scheduling Tool</h2>

        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Available Slots</h3>

          <ul className="space-y-4">
            {[
              "2025-01-05T10:00",
              "2025-01-05T12:00",
              "2025-01-06T14:00",
              "2025-01-06T16:00",
            ].map((slot) => (
              <li
                key={slot}
                className={`p-4 border rounded cursor-pointer ${
                  selectedSlot === slot
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleSlotSelect(slot)}
              >
                {new Date(slot).toLocaleString("en-US", { hour12: true })}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">
              Or Select a Custom Date & Time
            </h4>
            <input
              type="datetime-local"
              value={customSlot}
              onChange={(e:any) => setCustomSlot(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2"
            />
            <button
              onClick={handleCustomSlot}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 ml-4"
            >
              Select Custom Slot
            </button>
          </div>

          {selectedSlot && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold">
                Selected Slot:{" "}
                {new Date(selectedSlot).toLocaleString("en-US", {
                  hour12: true,
                })}
              </h4>
              <button
                onClick={handleReschedule}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 mt-4"
              >
                Reschedule
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4 ml-4"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Scheduling;
