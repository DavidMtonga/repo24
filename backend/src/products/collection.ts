import { prisma } from "../config/db";
import {
  CategoryIdDTO,
  ProductDTO,
  ProductIdDTO,
  UpdateProductImageDTO,
} from "./dto";

export class ProductCollection {
  async findProductsByCategory({ categoryId }: CategoryIdDTO) {
    return prisma.product.findMany({
      where: {
        categoryId,
      },
    });
  }

  async getProductById({ id }: ProductIdDTO) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  async addProduct(props: ProductDTO) {
    return prisma.product.create({
      data: props,
    });
  }

  async updateProductImages({ id, imageUrl }: UpdateProductImageDTO) {
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    const updatedImages = [...existingProduct.imageUrl, ...(imageUrl || [])];
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        imageUrl: updatedImages,
      },
    });
    return updatedProduct;
  }
}
