import mongoose, { ObjectId, Types } from "mongoose";
const Schema = mongoose.Schema;
const model: { NAME_COLLECTION: string } = {
    NAME_COLLECTION: "Varations",
};

interface ApiKeyType {
    key: string;
    status: string;
    permission: "0001" | "0002" | "0003";
}

const apiKeySchema = new Schema<ApiKeyType>({
    key: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    permission: {
        type: String,
        enum: ["0001", "0002", "0003"],
        required: true,
        default: "0002",
    },
});

const ApiKey = mongoose.model(model.NAME_COLLECTION, apiKeySchema);
export default ApiKey;
