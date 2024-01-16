import { ProductCollection } from "./collection";
import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import { StatusCodes } from "http-status-codes";

const productCollection = new ProductCollection();

export class ProductController {
  async addProductController(req: Request, res: Response) {
    try {
      cloudinary.v2.uploader.upload(
        req.file?.path,
        async function (err: Error, result: any | undefined) {
          if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: "Failed to upload images",
              error: err,
            });
          }

          if (!result) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: "Cloudinary upload response is undefined",
            });
          }

          const product = await productCollection.addProduct(req.body);
          return res.status(StatusCodes.OK).json({
            message: "Success",
            product: product,
            image: result,
          });
        }
      );
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error?.message || error,
      });
    }
  }
  async findProductsByCategoryController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categoryId = parseInt(id);
      const products = await productCollection.findProductsByCategory({
        categoryId,
      });
      return res.status(StatusCodes.OK).json(products);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error?.message || error,
      });
    }
  }
}
