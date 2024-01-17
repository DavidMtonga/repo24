import express from "express";
import { ProductController } from "./controller";

const productRouter = express.Router();
const productController = new ProductController();

productRouter.post("/add", productController.addProductController);

productRouter.get(
  "/get-by-category/:id",
  productController.findProductsByCategoryController
);

productRouter.put(
  "/upload-image/:id",
  productController.updateProductImagesController
);

productRouter.get("/:id", productController.getProductByIdController);

export default productRouter;
