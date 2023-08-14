import validator from "validator";
import bcrypt from "bcrypt";
import mongoose, { InferSchemaType, Model } from "mongoose";
const Schema = mongoose.Schema;
const model: { NAME_COLLECTION: string } = {
    NAME_COLLECTION: "User",
};

interface User {
    email: string;
    full_name: string;
    password: string;
    avatar: string | null;
    phone_number: string | null;
    birthday: string;
    role: "0001" | "0002" | "0003";
    gender: "Male" | "Feelmale" | "Unknow";
}
interface UserMethod {
    comparePassword({ password, passwordHash }: { password: string; passwordHash: string }): boolean;
}

type UserModel = Model<User, {}, UserMethod>;

const schema = new Schema<User, UserModel, UserMethod>(
    {
        email: {
            type: String,
            required: true,
            validate: {
                validator: (val: string) => {
                    return validator.isEmail(val);
                },
                message: "Trường email không hợp lệ!",
            },
        },
        full_name: {
            type: String,
            required: true,
            min: 3,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        avatar: {
            type: String,
        },
        phone_number: {
            type: String,
        },
        gender: {
            type: String,
            default: "Male",
        },
        birthday: {
            type: String,
        },
        role: {
            type: String,
            enum: ["0001", "0002", "0003"],
            default: "0003",
        },
    },
    { timestamps: true }
);

const User = mongoose.model(model.NAME_COLLECTION, schema);
export type UserType = InferSchemaType<typeof schema>;

schema.methods.comparePassword = function ({ password, passwordHash }) {
    const isExactly: boolean = bcrypt.compareSync(password, passwordHash);
    return isExactly;
};
export default User;
