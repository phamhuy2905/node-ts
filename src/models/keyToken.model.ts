import mongoose, { ObjectId } from "mongoose";
const Schema = mongoose.Schema;
const model: { NAME_COLLECTION: string } = {
    NAME_COLLECTION: "KetToken",
};

interface IKeyToken {
    user_id: ObjectId;
    public_key: string;
    private_key: string;
    refreshToken_already_used: string[];
}

const schema = new Schema<IKeyToken>(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            validate: {
                validator: async (val: ObjectId) => {
                    const foundUser = await mongoose.models.User.findById(val).lean();
                    return foundUser ? true : false;
                },
                message: "User id không hợp lệ!",
            },
        },
        private_key: {
            type: String,
            required: true,
        },
        public_key: {
            type: String,
            required: true,
        },
        refreshToken_already_used: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const KeyToken = mongoose.model(model.NAME_COLLECTION, schema);

export default KeyToken;
