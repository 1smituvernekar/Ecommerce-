
import express from "express";

import {
  addProduct,
  listProduct,
  singleProduct,
  deleteProduct,
} from "../Controllers/productController.js";

import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.array("images", 5),
  addProduct
);

productRouter.get("/list", listProduct);

productRouter.get("/:id", singleProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;

