require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");



const app = express();


const inspectionRoutes=require("./routes/inspectionRoutes")

const reportsRoutes=require("./routes/reportRoutes")

const authRoutes=require("./routes/auth")

const inspectorRoutes=require("./routes/inspectorRoutes")

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files


// Routes
app.use("/api", authRoutes);

app.use("/api/inspectors", inspectorRoutes);

app.use("/api/inspection", inspectionRoutes);

app.use("/api/reports",reportsRoutes); 




// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MongoDB URI is not defined in the .env file.");
  process.exit(1);  // Exit process if URI is not available
}

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,  serverSelectionTimeoutMS: 6000,  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
