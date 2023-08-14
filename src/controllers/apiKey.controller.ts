import asyncHandle from "~/middlewares/asyncHandle";
import { CREATED } from "../responPhrase/successResponse";
import ApiKeyService from "~/services/apiKey.service";
class ApiKeyController {
    static registerApiKey = asyncHandle(async (req, res, next) => {
        return new CREATED({ data: await ApiKeyService.registerApiKey(), message: "Đăng kí apikey thành công!" }).send(
            res
        );
    });
}

export default ApiKeyController;
