import { Router } from "express";
import { AuthController } from "./auth";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", authController.Login);

export default authRouter;
