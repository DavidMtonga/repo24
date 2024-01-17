import { Request, Response } from "express";
import { UserLoginDTO } from "./dto";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";

export class AuthController {
  async Login(req: Request, res: Response) {
    try {
      const userLoginDto = new UserLoginDTO(req.body);
      const userErrors = await validate(userLoginDto);
      if (userErrors.length > 0) {
        return res.status(StatusCodes.CONFLICT).json({
          error: userErrors.map((e) => e.constraints),
        });
      }
    } catch (error) {}
  }
}
