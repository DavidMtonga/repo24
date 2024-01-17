import multer from "multer";

export const multerStorage = multer.memoryStorage();
export const upload = multer({ storage: multerStorage });
