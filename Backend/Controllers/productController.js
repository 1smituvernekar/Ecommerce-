
import { v2 as cloudinary } from "cloudinary";
import Product from '../Models/ProductModels.js'

// ===============================  
// ADD PRODUCT
// ===============================
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    console.log("BODY:", req.body);

    // Check images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Image files missing",
      });
    }

    // Convert sizes string into array
    const sizesArray = JSON.parse(sizes);

    // Upload images to Cloudinary
    const imagesUrl = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);

      imagesUrl.push(result.secure_url);
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      category,
      subCategory,
      sizes: sizesArray,
      bestSeller,
      images: imagesUrl,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    console.log("Add Product Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// LIST ALL PRODUCTS
// ===============================
const listProduct = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    console.log("List Product Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// SINGLE PRODUCT
// ===============================
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.log("Single Product Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// DELETE PRODUCT
// ===============================
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log("Delete Product Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// EXPORT
// ===============================
export {
  addProduct,
  listProduct,
  singleProduct,
  deleteProduct,
};
