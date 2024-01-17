import { Router } from "express";
import { ProductController } from "./controller";
import { authorization } from "../middleware/authorization";

const productRouter = Router();
const productController = new ProductController();

productRouter.post(
  "/add",
  authorization,
  productController.addProductController
);

productRouter.get(
  "/get-by-category/:id",
  authorization,
  productController.findProductsByCategoryController
);

productRouter.put(
  "/upload-image/:id",
  authorization,
  productController.updateProductImagesController
);

productRouter.get(
  "/:id",
  authorization,
  productController.getProductByIdController
);

export default productRouter;
