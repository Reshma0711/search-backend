const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
 
});

// productSchema.index({
//   name: "text"
// });

// productSchema.index(
//   {
//     name: "text",
//     description: "text",
//     default_language: "none"
//   }
// );

const Product = mongoose.model("products", productSchema);

module.exports = Product;


