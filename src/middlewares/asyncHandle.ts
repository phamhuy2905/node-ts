import { NextFunction, Response, Request } from "express";

interface CustomRequest extends Request {
    [key: string]: string | number | boolean | any;
}

// type RequestHandlePromise = <T>(req: CustomRequest<T>, res: Response, next: NextFunction) => Promise<any>;
// type RequestHandle = (
//     fc: RequestHandlePromise
// ) => <T>(req: CustomRequest<T>, res: Response, next: NextFunction) => void;

// const asyncHandle: RequestHandle = (fc: RequestHandlePromise) => (req, res, next) => {
//     fc(req, res, next).catch(next);
// };

type RequestHandlePromise = (req: Request, res: Response, next: NextFunction) => Promise<any>;
type RequestHandle = (fc: RequestHandlePromise) => (req: Request, res: Response, next: NextFunction) => void;

const asyncHandle: RequestHandle = (fc: RequestHandlePromise) => (req, res, next) => {
    fc(req, res, next).catch(next);
};
export default asyncHandle;
