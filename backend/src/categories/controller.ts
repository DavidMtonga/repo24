// import { validate } from "class-validator";
// import { CategoryDto } from "./category.dto";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryCollection } from "./collection";

const categoryCollection = new CategoryCollection();

export class CategoryController {
  async GetAllCategories(_req: Request, res: Response) {
    try {
      const categories = await categoryCollection.findAllCategories();
      return res.status(StatusCodes.OK).json(categories);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error?.message || error,
      });
    }
  }
}
