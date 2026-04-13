const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    titleLeft: {
      type: String,
      default: "",
    },
    titleRight: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hero", heroSchema);
