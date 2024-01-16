import { prisma } from "../config/db";
import { ProductDTO } from "./dto";

export class ProductCollection {
  async findProductsByCategory(categoryId: number) {
    return prisma.product.findMany({
      where: {
        categoryId,
      },
    });
  }

  async addProduct(props: ProductDTO) {
    return prisma.product.create({
      data: props,
    });
  }
}
