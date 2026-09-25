const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      firstName,
      lastName,
      email,
      password,
      mobile,
      phone,
      address,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existing = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existing) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const finalFirstName =
      firstName || name?.split(" ")[0] || "";

    const finalLastName =
      lastName ||
      name?.split(" ").slice(1).join(" ") ||
      "";

    const finalPhone = phone || mobile || "";

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName: finalFirstName,
      lastName: finalLastName,
      name: name || `${finalFirstName} ${finalLastName}`.trim(),
      email: email.toLowerCase(),
      password: hash,
      phone: finalPhone,
      mobile: finalPhone,
      address: address || "",
      isAdmin: false,
      role: "user",
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        phone: user.phone,
        mobile: user.mobile,
        address: user.address,
        isAdmin: user.isAdmin,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name:
          user.name ||
          `${user.firstName} ${user.lastName}`.trim(),
        email: user.email,
        phone: user.phone || user.mobile,
        mobile: user.mobile || user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;