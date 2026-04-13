const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getAdminCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

router.get("/admin/all", protect, adminOnly, getAdminCategories);
router.post("/admin", protect, adminOnly, createCategory);
router.patch("/admin/:id", protect, adminOnly, updateCategory);
router.delete("/admin/:id", protect, adminOnly, deleteCategory);

router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);

module.exports = router;
