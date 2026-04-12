const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      default: null,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    sizes: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
