import { Request } from "express";
import path from "path";
import multer from "multer";
import { BadRequestError } from "~/responPhrase/errorResponse";
import handleFile from "~/utils/handleFile";
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, path.join(__dirname, "..", "/uploads"));
    },
    filename(req, file, callback) {
        const { originalname, fieldname } = file;
        const ext = path.extname(originalname);
        const fileName = `${fieldname}-${Date.now()}${ext}`;

        callback(null, fileName);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
    const { originalname, fieldname } = file;
    if (!originalname.match(/\.(png|jpg|jpeg)$/i)) {
        return callback(new BadRequestError("File không hợp lệ"));
    }
    const ext = path.extname(originalname);
    const fileName = `${fieldname}-${Date.now()}${ext}`;
    handleFile(fieldname, fileName, req);
    callback(null, false);
};

const upload = multer({ storage, fileFilter });

export default upload;
