import crypro from "crypto";
import ApiKey from "~/models/apiKey";
class ApiKeyService {
    static async registerApiKey() {
        const key = crypro.randomBytes(64).toString("hex");
        return await ApiKey.create({
            key,
            permission: "0002",
        });
    }
}

export default ApiKeyService;
