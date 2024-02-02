import { prisma } from "../config/db";

export class CategoryCollection {
  async findAllCategories() {
    await prisma.category.findMany({
      select: {
        name: true,
        id: true,
      },
    });
  }
}
