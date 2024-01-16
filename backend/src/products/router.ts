import express from "express";
import { ProductController } from "./controller";

const productRouter = express.Router();
const productController = new ProductController();

productRouter.post("/add-product", productController.addProductController);

export default productRouter;