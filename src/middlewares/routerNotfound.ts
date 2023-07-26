import { NextFunction, Response, Request } from "express";
type ErrorRequestHandler = (req: Request, res: Response, next: NextFunction) => any;

const routerNotFound: ErrorRequestHandler = (req, res, next) => {
    return res.status(400).json({
        success: false,
        status: 400,
        message: "Router not",
    });
};
export default routerNotFound;
