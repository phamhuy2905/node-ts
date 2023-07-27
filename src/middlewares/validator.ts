import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { UnprocessEntityError } from "../responPhrase/errorResponse";

const validator = (schema: Joi.ObjectSchema<any>, field?: "body" | "params" | "query") => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[field || "body"]);
        if (error) throw new UnprocessEntityError(error.message);
        next();
    };
};

export default validator;
