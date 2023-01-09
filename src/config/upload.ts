import multer from "multer";
import { resolve } from "path";
import crypto from "crypto";

export function upload(folder = "temp") {
  return {
    storage: multer.diskStorage({
      destination: resolve(__dirname, "..", "..", folder),
      filename: (req, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString("hex");
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      }
    })
  };
}