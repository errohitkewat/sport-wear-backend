const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

router.get("/admin", protect, adminOnly, getAllOrders);
router.patch("/admin/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;
