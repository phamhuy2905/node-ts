import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { UnprocessEntityError } from "../responPhrase/errorResponse";

const validator = (req: Request, res: Response, next: NextFunction) => {
    return ({ schema, field = "body" }: { schema: Joi.ObjectSchema<any>; field: "body" | "params" | "query" }) => {
        const { error } = schema.validate(req[field]);
        if (error) throw new UnprocessEntityError();
        next();
    };
};

export default validator;
