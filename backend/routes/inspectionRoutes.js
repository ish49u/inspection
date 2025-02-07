const express = require("express");
const multer = require("multer");
const path = require("path");
const Inspection = require("../models/Inspection");

const router = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// @route   POST /api/inspection
// @desc    Create an inspection request
// POST route to store inspection data
router.post("/", upload.single("document"), async (req, res) => {
  try {
    const {
      customerName,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      damageDescription,
      inspectionDate,
      inspectionTime,
      address, 
      mobileNumber 
    } = req.body;

    if (
      !customerName ||
      !vehicleMake ||
      !vehicleModel ||
      !vehicleYear ||
      !damageDescription ||
      !inspectionDate ||
      !inspectionTime||
      !address|| 
      !mobileNumber
    ) {
      return res
        .status(400)
        .json({ error: "All fields except file are required" });
    }

    const newInspection = new Inspection({
      customerName,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      damageDescription,
      inspectionDate,
      inspectionTime,
      address, 
      mobileNumber ,
      document: req.file ? req.file.filename : null,
    });

    await newInspection.save();
    res.json({ message: "Inspection request submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/inspection
router.get("/", async (req, res) => {
  try {
    const inspections = await Inspection.find().sort({ createdAt: -1 });

    const formattedInspections = inspections.map((insp) => ({
      _id: insp._id.toString(),
      id: insp._id.toString(),
      customerName: insp.customerName || "Unknown Customer", // Ensure it is retrieved
      vehicleMake: insp.vehicleMake,
      vehicleModel: insp.vehicleModel,
      vehicleYear: insp.vehicleYear,
      damageDescription: insp.damageDescription,
      address:insp.address,
      mobileNumber:insp.mobileNumber,
      inspectionDate: insp.inspectionDate 
        ? insp.inspectionDate.toISOString().split("T")[0]
        : "N/A", // Properly format date
      inspectionTime: insp.inspectionTime,
      status: insp.status || "Pending",
      date: insp.inspectionDate
        ? insp.inspectionDate.toISOString().split("T")[0]
        : "N/A", // Make sure this field exists in your model
    }));

    res.status(200).json(formattedInspections);
  } catch (error) {
    console.error("Error fetching inspections:", error);
    res.status(500).json({ error: "Failed to fetch inspection requests." });
  }
});



// @route   PUT /api/inspection/:id
// @desc    Update the status of an inspection request
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedInspection = await Inspection.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedInspection) {
      return res.status(404).json({ error: "Inspection not found." });
    }

    res.status(200).json(updatedInspection);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status." });
  }
});

// @route   DELETE /api/inspection/:id
// @desc    Delete a pending inspection request
router.patch("/:id/cancel", async (req, res) => {
  try {
    const { id } = req.params;
    const inspection = await Inspection.findByIdAndUpdate(id, { status: "Cancelled" }, { new: true });

    if (!inspection) {
      return res.status(404).json({ message: "Inspection not found" });
    }

    res.json(inspection);
  } catch (error) {
    console.error("Error cancelling inspection:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;