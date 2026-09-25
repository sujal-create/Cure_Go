const express = require("express");
const Medicine = require("../models/Medicine");

const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const { category, q } = req.query;

    const filter = {};

    // Category filter
    if (category && category.trim()) {
      filter.category = category.trim();
    }

    // Search filter
    if (q && q.trim()) {
      filter.$or = [
        {
          name: {
            $regex: q.trim(),
            $options: "i",
          },
        },
        {
          title: {
            $regex: q.trim(),
            $options: "i",
          },
        },
      ];
    }

    const medicines = await Medicine.find(filter)
      .sort({ name: 1 })
      .limit(500);

    res.status(200).json(medicines);
  } catch (error) {
    console.error("Medicine Fetch Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch medicines",
    });
  }
});

/*
GET /api/medicines/:id
*/

router.get("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(
      req.params.id
    );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json(medicine);
  } catch (error) {
    console.error("Medicine Details Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;