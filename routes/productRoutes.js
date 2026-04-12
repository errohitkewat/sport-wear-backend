const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/admin/all", protect, adminOnly, getAdminProducts);
router.post("/admin", protect, adminOnly, createProduct);
router.patch("/admin/:id", protect, adminOnly, updateProduct);
router.delete("/admin/:id", protect, adminOnly, deleteProduct);

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

module.exports = router;
