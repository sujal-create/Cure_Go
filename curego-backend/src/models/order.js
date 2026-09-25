const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    customerName: String,
    email: String,
    phone: String,

    address: {
      name: String,
      phone: String,
      line1: String,
      city: String,
      state: String,
      pincode: String,
    },

    items: [
      {
        productId: String,
        title: String,
        price: Number,
        quantity: Number,
        prescriptionRequired: Boolean,
        prescriptionImage: String,
      },
    ],

    totalAmount: Number,

    razorpayOrderId: String,
    razorpayPaymentId: String,

    paymentStatus: {
      type: String,
      default: "Paid",
    },

    orderStatus: {
      type: String,
      default: "Pending",
    },
    riderId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Rider",
},

riderName: String,

deliveryStatus: {
  type: String,
  default: "Pending",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);