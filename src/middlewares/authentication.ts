import jwt from "jsonwebtoken";
import { HEADERS } from "~/constants";
import { UnauthorizedError } from "~/responPhrase/errorResponse";
import { foundKeyTokenByUserId } from "~/models/repositories/keyToken.repo";
import asyncHandle from "./asyncHandle";
import { Request } from "express";
import { findUserById } from "~/models/repositories/auth.repo";
import { omitLodahs } from "~/utils/lodash";

type ValidationToken = (req: Request) => { accessToken: string; refreshToken: string; user_id: string };

const checkValidationToken: ValidationToken = (req) => {
    const headerAccessToken = req.headers[HEADERS.authorization] as string;

    if (!headerAccessToken || !headerAccessToken.startsWith("Bearer"))
        throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");

    const accessToken = headerAccessToken.split(" ")[1];
    if (!accessToken) throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");
    if (!req.headers[HEADERS["x-id-key"]]) throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");

    return { accessToken, refreshToken, user_id: req.headers[HEADERS["x-id-key"]] as string };
};
const authentication = asyncHandle(async (req, res, next) => {
    const { accessToken, refreshToken, user_id } = checkValidationToken(req);

    const foundKeyToken = await foundKeyTokenByUserId(user_id);
    if (!foundKeyToken) throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");

    const foundUser = await findUserById(user_id);
    if (!foundUser) throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");

    jwt.verify(accessToken, foundKeyToken.public_key, (err, decode) => {
        if (err && err?.name === "TokenExpiredError") throw new UnauthorizedError("TokenExpiredError");
        if (err && err.name !== "TokenExpiredError") throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");
    });

    jwt.verify(refreshToken, foundKeyToken.private_key, (err, decode) => {
        if (err) throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");

        req.keyToken = foundKeyToken;
        req.refreshTokenOld = refreshToken;
        req.user_id = user_id;
        req.user = foundUser;
        next();
    });
});

const authenticationV2 = asyncHandle(async (req, res, next) => {
    const { accessToken, refreshToken, user_id } = checkValidationToken(req);
    const foundKeyToken = await foundKeyTokenByUserId(user_id);
    if (!foundKeyToken) throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");

    const foundUser = await findUserById(user_id);
    if (!foundUser) throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");

    jwt.verify(accessToken, foundKeyToken.public_key, (err, _) => {
        if (err && err?.name !== "TokenExpiredError") throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");
    });

    jwt.verify(refreshToken, foundKeyToken.private_key, (err, _decode) => {
        if (err) throw new UnauthorizedError("Vui lòng đăng nhập để tiếp tục!");
        req.keyToken = foundKeyToken;
        req.refreshTokenOld = refreshToken;
        req.user_id = user_id;
        req.user = foundUser;
        next();
    });
});

export { authentication, authenticationV2 };
