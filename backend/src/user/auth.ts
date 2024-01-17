import { Request, Response } from "express";
import { UserLoginDTO } from "./dto";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../config/db";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

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
      const user = await prisma.user.findFirst({
        where: {
          email: userLoginDto.email,
        },
      });
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: "User doesn't exist",
        });
      }
      const match = await compare(userLoginDto.password, user.password);
      if (!match) {
        return res.status(StatusCodes.CONFLICT).json({
          error: "Passwords don't match",
        });
      }
      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
      };
      const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn: "1hr",
      });
      return res.status(StatusCodes.OK).json({
        username: user.username,
        email: user.email,
        token: token,
      });
    } catch (error) {}
  }
}
