import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  CategoryIdDTO,
  ProductDTO,
  ProductIdDTO,
  UpdateProductImageDTO,
} from "./products.dto";
import { validate } from "class-validator";
import { ProductCollection } from "./collection";
import { upload } from "../utils/multer";

const productCollection = new ProductCollection();

export class ProductController {
  async addProductController(req: Request, res: Response) {
    try {
      const productDTO = new ProductDTO(req.body);
      const productErrors = await validate(productDTO);

      if (productErrors.length > 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: productErrors.map((e) => e.constraints) });
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

  async getProductByIdController(req: Request, res: Response) {
    try {
      const productIdDTO = new ProductIdDTO({
        id: parseInt(req.params.id, 10),
      });
      const productIdDTOError = await validate(productIdDTO);

      if (productIdDTOError.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Something went wrong",
          error: productIdDTOError.map((e) => e.constraints),
        });
      }
      const product = await productCollection.getProductById(productIdDTO);
      return res.status(StatusCodes.OK).json(product);
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error.message || error,
      });
    }
  }

  async updateProductImagesController(req: Request, res: Response) {
    try {
      const uploadPromise = new Promise<void>((resolve, reject) => {
        upload.array("images", 2)(req, res, (e: any) => {
          if (e) {
            reject(e);
          } else {
            resolve();
          }
        });
      });
      await uploadPromise;
      const images = req.files as Express.Multer.File[];
      const imageUrls = await Promise.all(
        images.map(async (image) => String(image?.path))
      );

      if (imageUrls.length > 2) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Only a maximum of 2 images are allowed.",
        });
      }
      const updateProductImageDTO = new UpdateProductImageDTO({
        id: parseInt(req.params.id, 10),
        imageUrl: imageUrls,
      });
      const updateImageErrors = await validate(updateProductImageDTO);

      if (updateImageErrors.length > 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: updateImageErrors.map((e) => e.constraints) });
      }

      const updatedProduct = await productCollection.updateProductImages({
        id: updateProductImageDTO.id,
        imageUrl: updateProductImageDTO.imageUrl,
      });

      return res.status(StatusCodes.OK).json({
        message: "Product images updated successfully",
        product: updatedProduct,
      });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error?.message || error,
      });
    }
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
          .json({ errors: categoryIdErrors.map((e) => e.constraints) });
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
