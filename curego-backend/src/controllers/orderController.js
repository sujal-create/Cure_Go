const Order = require("../models/order");
const Rider = require("../models/Rider");

const createOrder = async (req, res) => {
  try {
    const availableRider =
      await Rider.findOne({
        isAvailable: true,
      });

    const order = await Order.create({
      ...req.body,

      riderId:
        availableRider?._id || null,
    });

    if (availableRider) {
      availableRider.isAvailable = false;

      await availableRider.save();
    }

    res.status(201).json({
      success: true,
      order,
      rider: availableRider,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    })
      .populate("riderId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};