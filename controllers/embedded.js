const Product = require("../models/products1");

exports.embedded = async (req, res) => {
  try {
    const query = req.query.key;
    const results = await Product.aggregate([
      {
        $search: {
            index: "default",
            compound: {
              should: [
                {
                  autocomplete: {
                    query: "le",
                    path: "name",
                    tokenOrder: "sequential"
                  }
                },
                {
                  autocomplete: {
                    query: "ele",
                    path: "category.categoryName",
                    tokenOrder: "sequential"
                  }
                }
              ],
              minimumShouldMatch: 1
            }
          }
      },
    ]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
