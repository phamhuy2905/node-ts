import { Request } from "express";
const handleFile = (fieldName: string, fileName: string, req: Request) => {
    switch (fieldName) {
        case "avatar":
            req.body.avatar = fileName;
            break;
        case "product_thumbnail":
            req.body.product_thumbnail = fileName;
            break;
        case "product_multiple_thumbnail":
            if (!req.images) req.images = [];
            req.images.push(fileName);
            req.body.product_multiple_thumbnail = req.images;
            break;
        default:
            break;
    }
};

export default handleFile;
