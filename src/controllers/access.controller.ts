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
}

export default AccessController;
