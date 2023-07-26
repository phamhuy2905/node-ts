import { NextFunction, Response, Request } from "express";
type ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => any;

const globalMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        status: err.status || 500,
        message: err.message || "Sever internal!!",
    });
};
export default globalMiddleware;
