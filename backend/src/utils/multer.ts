import multer from "multer";
import { promisify } from "util";
import { createReadStream } from "fs";
import zlib from "zlib";

const readFileAsync = promisify(createReadStream);

export const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (_req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});
export const upload = multer({ storage: multerStorage });

export async function compressAndSaveToDB(filePath: string): Promise<string> {
  try {
    const fileContent = await readFileAsync(filePath, { encoding: "utf-8" });
    const base64Data = Buffer.from(fileContent as string).toString("base64");
    const compressedData = zlib.gzipSync(Buffer.from(base64Data, "base64"));
    return compressedData.toString("base64");
  } catch (error: any) {
    throw new Error(`Failed to compress and save to DB: ${error.message}`);
  }
}
