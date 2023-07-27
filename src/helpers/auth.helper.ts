import bcrypt from "bcrypt";
import { Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const createTokenPair = ({
    payload,
    public_key,
    private_key,
}: {
    payload: { user_id: string | mongoose.Schema.Types.ObjectId };
    public_key: string;
    private_key: string;
}) => {
    const accessToken = jwt.sign(payload, public_key, {
        expiresIn: process.env.EXPIRES_AC_TOKEN,
    });
    const refreshToken = jwt.sign(payload, private_key, {
        expiresIn: process.env.EXPIRES_RF_TOKEN,
    });
    return { accessToken, refreshToken };
};

const createSecret = (): { public_key: string; private_key: string } => {
    const public_key = crypto.randomBytes(64).toString("hex");
    const private_key = crypto.randomBytes(64).toString("hex");
    return { public_key, private_key };
};

const generateCookie = (res: Response, key: string, token: string) => {
    const expiresDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    res.cookie(key, token, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
        expires: expiresDate,
    });
};

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
};

const comparePassword = async (password: string, passwordHash: string) => {
    const isExactly: boolean = await bcrypt.compare(password, passwordHash);
    return isExactly;
};

export { createTokenPair, createSecret, generateCookie, hashPassword, comparePassword };
