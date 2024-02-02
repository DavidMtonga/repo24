import { Router } from "express";
import { CategoryController } from "./controller";
import { authorization } from "../middleware/authorization";

const CategoryRouter = Router();
const categoryController = new CategoryController();

CategoryRouter.get("/all", authorization, categoryController.GetAllCategories);
