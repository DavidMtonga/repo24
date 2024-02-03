import { prisma } from "../config/db";

export class CategoryCollection {
  async findAllCategories() {
    return await prisma.category.findMany({
      select: {
        name: true,
        id: true,
      },
    });
  }
}
