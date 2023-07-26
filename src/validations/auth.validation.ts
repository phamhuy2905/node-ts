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

const authRegister = Joi.object<AuthRegister>({
    email: Joi.string().required().regex(emailRegex),
    full_name: Joi.string().required().min(3),
    avatar: Joi.string().allow(null),
    password: Joi.string().required().min(8),
    password_confirm: Joi.string().valid(Joi.ref("password")).required(),
});
const authLogin = Joi.object<AuthLogin>({
    email: Joi.string().required().regex(emailRegex),
    password: Joi.string().required().min(8),
});

export { authRegister, authLogin };
