import KeyToken from "~/models/keyToken.model";

const foundKeyTokenByUserId = async (user_id: string) => {
    return await KeyToken.findOne({ user_id }).lean();
};

export { foundKeyTokenByUserId };
