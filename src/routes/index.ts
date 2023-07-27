import express from "express";
const router = express.Router();
import authRouter from "./auth";

router.use("/api/v1/auth", authRouter);

export default router;
