const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,

    isAvailable: {
      type: Boolean,
      default: true,
    },

    currentLat: Number,
    currentLng: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Rider",
  riderSchema
);