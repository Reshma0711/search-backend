const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    categoryName: { type: String, required: true },
    description: { type: String }
  }
});

const Product = mongoose.model("values", ProductSchema);

module.exports = Product