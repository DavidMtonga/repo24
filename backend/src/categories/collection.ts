import { prisma } from "../config/db";

export class CategoryCollection {
  async findAllCategories() {
    await prisma.category.findMany({
      include: {
        Product: false,
      },
    });
  }
}
