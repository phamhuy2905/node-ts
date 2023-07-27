import User from "~/models/user.model";

const findUserById = async (id: string) => {
    return await User.findById(id).lean();
};

export { findUserById };
