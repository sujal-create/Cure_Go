const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    category: String,
    price: Number,
    stock: Number,
    image: String,
    description: String,

    prescriptionRequired: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);