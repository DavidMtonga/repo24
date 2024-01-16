import { prisma } from "../config/db";
import { CategoryIdDTO, ProductDTO } from "./dto";

export class ProductCollection {
  async findProductsByCategory({ categoryId }: CategoryIdDTO) {
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
