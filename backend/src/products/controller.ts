import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import { StatusCodes } from "http-status-codes";
import { CategoryIdDTO, ProductDTO } from "./dto";
import { validate } from "class-validator";
import { ProductCollection } from "./collection";

const productCollection = new ProductCollection();

export class ProductController {
  async addProductController(req: Request, res: Response) {
    try {
      const productDTO = new ProductDTO(req.body);
      const productErrors = await validate(productDTO);

      if (productErrors.length > 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: productErrors.map((err) => err.constraints) });
      }
      
      const product = await productCollection.addProduct(productDTO);
      return res.status(StatusCodes.OK).json({
        message: "Success",
        product: product,
      });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error?.message || error,
      });
    }
  }

  async uploadImageController(file: Express.Multer.File | undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject("No file provided");
      }

      cloudinary.v2.uploader.upload(file.path, async function (err: Error, result: any | undefined) {
        if (err) {
          reject({
            message: "Failed to upload images",
            error: err,
          });
        }

        if (!result) {
          reject({
            message: "Cloudinary upload response is undefined",
          });
        }

        // You can perform additional logic here if needed

        resolve(result);
      });
    });
  }

  async findProductsByCategoryController(req: Request, res: Response) {
    try {
      const categoryIdDTO = new CategoryIdDTO({
        categoryId: parseInt(req.params.id, 10),
      });
      const categoryIdErrors = await validate(categoryIdDTO);

      if (categoryIdErrors.length > 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: categoryIdErrors.map((err) => err.constraints) });
      }

      const products = await productCollection.findProductsByCategory(
        categoryIdDTO
      );

      return res.status(StatusCodes.OK).json(products);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error?.message,
      });
    }
  }
}
