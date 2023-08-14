import { Request } from "express";
const handleFile = (fieldName: string, fileName: string, req: Request) => {
    switch (fieldName) {
        case "avatar":
            req.image = fileName;
            req.body.avatar = fileName;
            break;
        case "avatar1":
            req.images.push(fileName);
            break;
        default:
            break;
    }
};

export default handleFile;
