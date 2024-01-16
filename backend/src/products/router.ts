import express from "express";
import { ProductController } from "./controller";

const productRouter = express.Router();
const productController = new ProductController();

productRouter.post("/add", productController.addProductController);

productRouter.get(
  "/get-by-category/:id",
  productController.findProductsByCategoryController
);

export default productRouter;
