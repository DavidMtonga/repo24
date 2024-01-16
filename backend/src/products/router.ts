import express, { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";

const productRouter = express.Router();

productRouter.post("/add-product", (req: Request, res: Response) => {
  cloudinary.v2.uploader.upload(
    req.file?.path,
    function (err: Error, result: any) {
        if(err){
            res.status()
        }
    }
  );
});
