const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      deliveryFee,
      totalAmount,
    } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: "No order items provided" });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      deliveryFee,
      totalAmount,
      paymentStatus: paymentMethod === "upi" ? "Paid" : "Pending",
      orderStatus: "Pending",
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};