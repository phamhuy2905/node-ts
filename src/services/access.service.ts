import { Request, Response } from "express";
import User from "~/models/user.model";
import { BadRequestError, NotFoundError, UnauthorizedError } from "~/responPhrase/errorResponse";
import { createKeyToken, destroyKeyToken, updateKeyToken } from "./keyToken.service";
import { comparePassword, createSecret, createTokenPair, generateCookie, hashPassword } from "~/helpers/auth.helper";
import convertObjectId from "~/utils/convertObjectId";
import { omitLodahs, pickLodash } from "~/utils/lodash";
import { HEADERS } from "~/constants";
class AccessService {
    static async register(req: Request) {
        const { email, password, full_name } = req.body;
        const foundUser = await User.findOne({ email }).lean();

        if (foundUser) throw new BadRequestError("Email đã được sử dụng!");

        const hash = await hashPassword(password);
        const newUser = await User.create({ email, password: hash, full_name, role: "0003" });

        return pickLodash(newUser.toObject(), ["email", "full_name", "_id"]);
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) throw new NotFoundError("Email hoặc mật khẩu không hợp lệ!");

        const isExactPassword = await comparePassword(password, foundUser.password);
        if (!isExactPassword) throw new NotFoundError("Email hoặc mật khẩu không hợp lệ!");

        const { public_key, private_key } = createSecret();
        const userId = convertObjectId(foundUser._id);

        const keyToken = await createKeyToken({
            user_id: foundUser._id,
            private_key,
            public_key,
            refreshToken_already_used: [],
        });

        if (!keyToken) throw new BadRequestError();

        const { accessToken, refreshToken } = createTokenPair({
            payload: { user_id: userId },
            public_key,
            private_key,
        });
        generateCookie(res, "refreshToken", refreshToken);
        res.setHeader(HEADERS["x-id-key"], foundUser._id.toString());
        return {
            user: omitLodahs(foundUser.toObject(), ["password", "__v"]),
            accessToken,
        };
    }

    static async logout(req: Request, res: Response) {
        await destroyKeyToken(req.user_id!);
        res.clearCookie("refershToken");
        return;
    }

    static async handleRefreshToken(req: Request, res: Response) {
        const {
            user,
            user_id,
            refreshTokenOld,
            keyToken: { public_key, private_key, refreshToken_already_used },
        } = req;
        const isTokenUsed = refreshToken_already_used.includes(refreshTokenOld);

        if (isTokenUsed) {
            destroyKeyToken(req.user_id!);
            throw new UnauthorizedError("Something wrongg!!");
        }

        const { accessToken, refreshToken } = createTokenPair({
            payload: { user_id: user_id! },
            public_key,
            private_key,
        });

        await updateKeyToken({ user_id: user_id!, refreshToken_already_used: refreshTokenOld! });
        generateCookie(res, "refreshToken", refreshToken);
        res.setHeader(HEADERS["x-id-key"], user_id!);
        return {
            user,
            accessToken,
        };
    }
}

export default AccessService;
