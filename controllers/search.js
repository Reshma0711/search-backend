const Product = require("../models/products");

exports.getData = async (req, res) => {
  try {
    const products = await Product.find();
    // console.log(products);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.searchItem = async (req, res) => {
  try {
    const { key } = req.query;
    const searchCond = {
      $or: [
        { name: { $regex: key, $options: "i" } },
        { category: { $regex: key, $options: "i" } },
        { brand: { $regex: key, $options: "i" } },
      ],
    };
    if (!key) {
      return res.status(400).json({
        success: false,
        message: "Search key is required",
      });
    }
    const products = await Product.find(searchCond);
    console.log(products);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.textIndex = async (req, res) => {
  try {
    const { key } = req.query;
    const searchCond = { $text: { $search: key } };
    console.log(key);
    if (!key) {
      return res.status(400).json({
        success: false,
        message: "Search key is required",
      });
    }
    const products = await Product.find(searchCond);
    console.log(products);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.atlasSearch = async (req, res) => {
  try {
    const query = req.query.key;

    const results = await Product.aggregate([
      {
        $search: {
          index: "default", // Your Atlas Search Index Name
          compound: {
            should: [
              {
                autocomplete: { query, path: "name", tokenOrder: "sequential" },
              },
              {
                autocomplete: {
                  query,
                  path: "description",
                  tokenOrder: "sequential",
                },
              },
              {
                autocomplete: {
                  query,
                  path: "category",
                  tokenOrder: "sequential",
                },
              },
            ],
          },
        },
      },
      { $limit: 10 }, // Limit results
    ]);

    res.status(201).json({
      message: "Successfully searched results based on querykey",
      results,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
