import Joi from "joi";
import mongoose from "mongoose";
const customMessage = (
    errors: Joi.ErrorReport[] = [],
    { fieldName, max, min }: { fieldName: string; max?: number; min?: number }
) => {
    let errorString: string;
    for (let index = 0; index < errors.length; index++) {
        const err = errors[index];
        switch (err.code) {
            case "string.empty":
                err.message = `Truờng ${fieldName} không được bỏ trống!`;
                errorString = err.message;
                break;

            case "string.max":
                err.message = `Trường ${fieldName} tối đa ${max} kí tự!`;
                errorString = err.message;
                break;
            case "string.min":
                err.message = `Trường ${fieldName} tối thiểu ${min} kí tự!`;
                errorString = err.message;
                break;
            case "string.email":
                err.message = `Trường ${fieldName} không đúng định dạng!`;
                errorString = err.message;
                break;
        }
    }
    return errors;
};

const requiredId = Joi.object({
    id: Joi.required().custom((value, helper) => {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if (!isValid) return helper.error("any.invalid");
    }),
});

export { customMessage, requiredId };
