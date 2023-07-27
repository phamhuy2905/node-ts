import mongoose from "mongoose";

const convertObjectId = (id: mongoose.Types.ObjectId) => {
    return new mongoose.Types.ObjectId(id).toString();
};

export default convertObjectId;
