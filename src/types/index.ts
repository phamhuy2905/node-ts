import { NextFunction, Response, Request } from "express";
import mongoose, { Types } from "mongoose";
type ObjectId = mongoose.SchemaDefinitionProperty<Types.ObjectId> | undefined;

type Role = "0001" | "0002" | "0003";

type Req = Request;
type Res = Response;
type Next = NextFunction;

export { ObjectId, Role, Req, Res, Next };
