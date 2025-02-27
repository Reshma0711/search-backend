const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  stock: { type: Number, required: true },
  images: [{ type: String }],
});

// productSchema.index({
//   name: "text"
// });

productSchema.index(
  {
    name: "text",
    description: "text",
    default_language: "none"
  }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;


