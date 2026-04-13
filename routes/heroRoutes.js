const express = require("express");
const router = express.Router();

const { getHero, updateHero } = require("../controllers/heroControllers");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

router.get("/", getHero);
router.put("/", protect, adminOnly, updateHero);

module.exports = router;
