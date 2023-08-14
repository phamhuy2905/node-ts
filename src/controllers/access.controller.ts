import asyncHandle from "~/middlewares/asyncHandle";
import { CREATED } from "../responPhrase/successResponse";
import AccessService from "~/services/access.service";

class AccessController {
    static register = asyncHandle(async (req, res, _next) => {
        return new CREATED({ data: await AccessService.register(req) }).send(res);
    });
    static login = asyncHandle(async (req, res, _next) => {
        return new CREATED({ data: await AccessService.login(req, res) }).send(res);
    });
    static logout = asyncHandle(async (req, res, _next) => {
        return new CREATED({ data: await AccessService.logout(req, res) }).send(res);
    });
    static handleRefreshToken = asyncHandle(async (req, res, _next) => {
        return new CREATED({ data: await AccessService.handleRefreshToken(req, res) }).send(res);
    });
    static updatePassword = asyncHandle(async (req, res, _next) => {
        return new CREATED({ data: await AccessService.updatePassword(req) }).send(res);
    });
    static updateProfile = asyncHandle(async (req, res, _next) => {
        return new CREATED({ data: await AccessService.updateProfile(req) }).send(res);
    });
    static forgotPassword = asyncHandle(async (req, res, _next) => {
        return new CREATED({ data: await AccessService.forgotPassword(req) }).send(res);
    });
    static verifyForgotPassword = asyncHandle(async (req, res, _next) => {
        return new CREATED({ data: await AccessService.verifyForgotPassword(req) }).send(res);
    });
    static profile = asyncHandle(async (req, res, _next) => {
        return new CREATED({ data: await AccessService.profile(req) }).send(res);
    });
}

export default AccessController;
