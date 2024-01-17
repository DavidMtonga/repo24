import { Request, Response } from "express";
import { UserLoginDTO, UserRegisterDTO } from "./dto";
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../config/db";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/functions";

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
      const token = jwt.sign(payload, `${process.env.JWT_SECRET}`);
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
        })
        .status(StatusCodes.OK)
        .json({
          username: user.username,
          email: user.email,
          token: token,
        });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error.message || error,
      });
    }
  }

  async Register(req: Request, res: Response) {
    try {
      const userRegisterDto = new UserRegisterDTO(req.body);
      const userErrors = await validate(userRegisterDto);
      if (userErrors.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: userErrors.map((e) => e.constraints),
        });
      }
      const exists = await prisma.user.findFirst({
        where: {
          email: userRegisterDto.email,
        },
      });
      if (exists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: "User already exists",
        });
      }
      const hashedPassword = await hash(userRegisterDto.password, 10);
      const user = await prisma.user.create({
        data: {
          username: userRegisterDto.username,
          email: userRegisterDto.email,
          address: userRegisterDto.address,
          password: hashedPassword,
        },
      });
      await sendMail({
        to: userRegisterDto.email,
        from: "retaila@info.com",
        html: `
        <div style="background-color: #ff6347; text-align: center; padding: 24px; color: white;">
          <h1>User Registration Successful</h1>
        </div>
        <p>Thank you ${user.username} for registering with us!</p>
        <p>If you've forgotten your password, click on the forgot passord link in the login form to reset your password thanks!</p>
      `,
      });
      return res.status(StatusCodes.OK).json({
        username: user.username,
        message: "Successfully registered, kindly check your email and login",
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
        error: error.message || error,
      });
    }
  }
}
