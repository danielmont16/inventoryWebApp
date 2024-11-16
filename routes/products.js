const express = require("express");
const router = express.Router();
// Import mongoose model to be used
const Product = require("../models/product");

// Moved middleware function to extensions/authentication.js to make it reusable across different routers
const AuthenticationMiddleware = require("../extensions/authentication");

router.get("/", async (req, res, next) => {
  // retrieve ALL data, and sort by dueDate
  let products = await Product.find().sort([["creationDate", "descending"]]);
  // render view
  res.render("products/index", {
    dataset: products,
    user: req.user,
  });
});

// GET /Products/Add
router.get("/add", AuthenticationMiddleware ,(req, res, next) => {
  //getting the date of today to populate add-form creationDate
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
    let day = String(today.getDate()).padStart(2, '0');
    let fullDate =`${year}-${month}-${day}`;
  res.render("products/add", { title: "Add a new Product",user: req.user, creationDate: fullDate});
});

// POST /Products/Add
router.post("/add",AuthenticationMiddleware, async (req, res, next) => {
  let newProduct = new Product({
    code: req.body.code,
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    creationDate: req.body.creationDate,
  });
  await newProduct.save();
  res.redirect("/products");
});

// GET /products/delete/_id
// access parameters via req.params object
//  findByIdAndRemove DEPRECATED I am using findByIdAndDelete
router.get("/delete/:_id",AuthenticationMiddleware, async (req, res, next) => {
  let productId = req.params._id;
  await Product.findByIdAndDelete({ _id: productId });
  res.redirect("/products");
});

// GET /products/edit/_id
router.get("/edit/:_id",AuthenticationMiddleware, async (req, res, next) => {
  let productId = req.params._id;
  let productData = await Product.findById(productId);  
  res.render("products/edit", {
    title: "Edit Product Info",
    product: productData,
    user: req.user,
  });
});

// POST /products/edit/_id
router.post("/edit/:_id",AuthenticationMiddleware, async (req, res, next) => {
  let productId = req.params._id;
  await Product.findByIdAndUpdate(
    { _id: productId }, // filter to find the product to update
    {
      // updated data
      code: req.body.code,
      name: req.body.name,
      quantity: req.body.quantity,
      unit: req.body.unit,
      creationDate: req.body.creationDate,
    }
  );
  res.redirect("/products");
});

module.exports = router;