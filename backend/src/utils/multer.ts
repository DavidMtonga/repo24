import multer from "multer";
import cloudinary from "../utils/cloudinary";

export const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (_req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

export async function uploadImageController(
  file: Express.Multer.File
): Promise<any> {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file.path,
      async function (err: Error, result: any | undefined) {
        if (err) {
          reject({
            message: "Failed to upload images",
            error: err,
          });
        }

        if (!result) {
          reject({
            message: "Cloudinary upload response is undefined",
          });
        }

        // You can perform additional logic here if needed

        resolve(result);
      }
    );
  });
}
