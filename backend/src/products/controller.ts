import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryIdDTO, ProductDTO, UpdateProductImageDTO } from "./dto";
import { validate } from "class-validator";
import { ProductCollection } from "./collection";
import { uploadImageController } from "../utils/multer";

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

  async updateProductImagesControllerreq(req: Request, res: Response) {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || !Array.isArray(files)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: [{ message: "No files provided or invalid file format" }],
        });
      }
      const updateProductImageDTO = new UpdateProductImageDTO({
        id: parseInt(req.params.id, 10),
        imageUrl: files.map((file) => file.path),
      });

      const updateImageErrors = await validate(updateProductImageDTO);

      if (updateImageErrors.length > 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: updateImageErrors.map((err) => err.constraints) });
      }
      const results = await Promise.all(
        files.map((file) => uploadImageController(file))
      );

      const imageUrls = results.map((result: any) => result.secure_url);
      const updatedProduct = await productCollection.updateProductImages({
        id: updateProductImageDTO.id,
        imageUrl: imageUrls,
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
