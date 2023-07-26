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
    role: "0001" | "0002" | "0003";
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
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model(model.NAME_COLLECTION, schema);
export type UserType = InferSchemaType<typeof schema>;

schema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
});

schema.methods.comparePassword = function ({ password, passwordHash }) {
    const isExactly: boolean = bcrypt.compareSync(password, password);
    return isExactly;
};
export default User;
