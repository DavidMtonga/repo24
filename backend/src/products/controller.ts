import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryIdDTO, ProductDTO, UpdateProductImageDTO } from "./dto";
import { validate } from "class-validator";
import { ProductCollection } from "./collection";
import { compressAndSaveToDB, upload } from "../utils/multer";

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

  async updateProductImagesController(req: Request, res: Response) {
  try {
    // Using a promise to wrap the upload.array middleware
    const uploadPromise = new Promise<void>((resolve, reject) => {
      upload.array("images")(req, res, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Wait for the upload to finish
    await uploadPromise;

    // Process the images after upload is complete
    const images = req.files as Express.Multer.File[];
    const updateProductImageDTO = new UpdateProductImageDTO({
      id: parseInt(req.params.id, 10),
      imageUrl: await Promise.all(
        images.map(async (image) => compressAndSaveToDB(image.path))
      ),
    });

    const updateImageErrors = await validate(updateProductImageDTO);

    if (updateImageErrors.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: updateImageErrors.map((err) => err.constraints) });
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
