const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Inspector = require("../models/Inspector");

const router = express.Router();


// Register Inspector
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let existingInspector = await Inspector.findOne({ email });
    if (existingInspector) {
      return res.status(400).json({ message: "Inspector already exists." });
    }

    const newInspector = new Inspector({ name, email, password });
    await newInspector.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Inspector Login Route
// Inspector Login Route (No JWT or session management)
router.post("/inspector-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const inspector = await Inspector.findOne({ email });
    if (!inspector) {
      return res.status(400).json({ message: "Inspector not found." });
    }

    const isMatch = await inspector.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful!" }); // No token or session here
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
