const mongoose = require("mongoose");
const purseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Purse = mongoose.model("Purse", purseSchema);

module.exports = Purse;
