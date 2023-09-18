import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { UnprocessEntityError } from "../responPhrase/errorResponse";

const validator = (
    schema: Joi.ObjectSchema<any>,
    fieldParse?: string[] | null,
    field?: "body" | "params" | "query"
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const payload = req[field || "body"];
        if (fieldParse && fieldParse?.length) {
            fieldParse.forEach((val) => (payload[val] = JSON.parse(payload[val])));
        }

        const { error } = schema.validate(payload);
        if (error) throw new UnprocessEntityError(error.message);
        next();
    };
};

export default validator;
