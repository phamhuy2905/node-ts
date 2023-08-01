import validator from "~/middlewares/validator";
import express from "express";
import AccessController from "~/controllers/access.controller";
import {
    authForgotPassword,
    authLogin,
    authRegister,
    authUpdatePassword,
    authVerifyForgotPassword,
} from "~/validations/auth.validation";
import { authentication, authenticationV2 } from "~/middlewares/authentication";
const router = express.Router();

router.post("/register", validator(authRegister), AccessController.register);
router.post("/login", validator(authLogin), AccessController.login);
router.post("/logout", authentication, AccessController.logout);
router.patch("/updatePassword", authentication, validator(authUpdatePassword), AccessController.updatePassword);
router.post("/forgotPassword", authentication, validator(authForgotPassword), AccessController.forgotPassword);
router.patch(
    "/verifyForgotPassword",
    authentication,
    validator(authVerifyForgotPassword),
    AccessController.verifyForgotPassword
);
router.get("/profile", authentication, AccessController.profile);
router.post("/refreshToken", authenticationV2, AccessController.handleRefreshToken);

export default router;
