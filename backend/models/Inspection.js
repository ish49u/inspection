const mongoose = require("mongoose");

const InspectionRequestSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled", "Closed"], // Only allow these statuses
    default: "Pending",
  },
  customerName: { type: String, required: true },
  vehicleMake: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleYear: { type: Number, required: true },
  damageDescription: { type: String, required: true },
  inspectionDate: { type: Date, required: true },
  inspectionTime: { type: String, required: true },
  address: { type: String, required: true }, // New field
  mobileNumber: { type: String, required: true }, // New field
  document: { type: String },
});

module.exports = mongoose.model("InspectionRequest", InspectionRequestSchema);
