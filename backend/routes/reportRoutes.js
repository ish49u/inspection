const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Report = require("../models/Report");
const InspectionRequest = require("../models/Inspection"); // Assuming you have a model for requests

const router = express.Router();

// Ensure the "uploads" directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// API Route for Uploading Reports
router.post("/:inspectorId/:requestId", upload.single("file"), async (req, res) => {
  try {
    const { inspectorId, requestId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Find the inspection request
    const request = await InspectionRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Inspection request not found" });
    }

    // Save Report in Database
    const newReport = new Report({
      inspectorId,
      requestId,
      filePath: req.file.path,
      uploadedAt: new Date(),
    });
    

    await newReport.save();

    res.status(201).json({ message: "Report uploaded successfully", report: newReport });
  } catch (error) {
    console.error("Error uploading report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// API Route for fetching reports based on the inspection request ID
router.get("/", async (req, res) => {
  try {

    const { requestId } = req.query; // Use query parameters
    const filter = requestId ? { requestId } : {}; // If no requestId is provided, return all reports
    const reports = await Report.find(filter);
    console.log("Fetched Reports:", reports); // Debugging
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// API Route for downloading a report based on the report ID
router.get("/download/:reportId", async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const filePath = path.resolve(report.filePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    res.download(filePath, path.basename(filePath));
  } catch (error) {
    console.error("Error downloading the report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
