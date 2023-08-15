import Joi from "joi";
import { emailRegex } from "~/helpers/regex";

interface AuthRegister {
    email: string;
    full_name: string;
    password: string;
    password_confirm: string;
    avatar: string;
}
interface AuthLogin {
    email: string;
    password: string;
}
interface AuthUpdatePassword {
    password: string;
    new_password: string;
    password_confirm: string;
}
interface AuthUpdateProfile {
    avatar: string;
    phone_number: string;
    day: number;
    month: number;
    year: number;
    gender: "Male" | "Feelmale" | "Unknow";
}

interface AuthForgotPassword {
    email: string;
}
interface VerifyForgotPassword {
    email: string;
    otp: number;
    password: string;
}

const authRegister = Joi.object<AuthRegister>({
    email: Joi.string().required().regex(emailRegex),
    // .error((error) => customMessage(error, { fieldName: "email" })),
    full_name: Joi.string().required().min(3),
    avatar: Joi.string().allow(null),
    password: Joi.string().required().min(8),
    password_confirm: Joi.string().valid(Joi.ref("password")).required(),
});
const authLogin = Joi.object<AuthLogin>({
    email: Joi.string().required().regex(emailRegex),
    password: Joi.string().required().min(8),
});

const authUpdatePassword = Joi.object<AuthUpdatePassword>({
    password: Joi.string().required().min(8),
    new_password: Joi.string().required().min(8),
    password_confirm: Joi.string().valid(Joi.ref("new_password")).required(),
});
const authUpdateProfile = Joi.object<AuthUpdateProfile>({
    avatar: Joi.string().allow(null),
    phone_number: Joi.string().allow(null),
    day: Joi.number().allow(null),
    month: Joi.number().allow(null),
    year: Joi.number().allow(null),
    gender: Joi.string().valid("Male", "Feelmale", "Unknow").default("Unknow"),
});
const authForgotPassword = Joi.object<AuthForgotPassword>({
    email: Joi.string().required().regex(emailRegex),
});
const authVerifyForgotPassword = Joi.object<VerifyForgotPassword>({
    email: Joi.string().required().regex(emailRegex),
    otp: Joi.number().required(),
    password: Joi.string().required().min(8),
});

export { authRegister, authLogin, authUpdatePassword, authForgotPassword, authVerifyForgotPassword, authUpdateProfile };
