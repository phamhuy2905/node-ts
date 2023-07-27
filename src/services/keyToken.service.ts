import { FlattenMaps, Types } from "mongoose";
import KeyToken, { IKeyToken } from "~/models/keyToken.model";

type CreateKeyToken = (props: IKeyToken) => Promise<
    FlattenMaps<IKeyToken> & {
        _id: Types.ObjectId;
    }
>;
const createKeyToken: CreateKeyToken = async ({ user_id, public_key, private_key, refreshToken_already_used }) => {
    const keyToken = await KeyToken.findOneAndUpdate(
        { user_id },
        { user_id, public_key, private_key, refreshToken_already_used },
        { new: true, upsert: true }
    ).lean();
    return keyToken;
};

const updateKeyToken = async ({
    user_id,
    refreshToken_already_used,
}: {
    user_id: string;
    refreshToken_already_used: string;
}) => {
    const keyToken = await KeyToken.findOneAndUpdate(
        { user_id },
        {
            user_id,
            $addToSet: {
                refreshToken_already_used,
            },
        },
        { new: true, upsert: true }
    ).lean();
    return keyToken;
};

const destroyKeyToken = async (user_id: string) => {
    return await KeyToken.findOneAndDelete({ user_id });
};

export { createKeyToken, destroyKeyToken, updateKeyToken };
