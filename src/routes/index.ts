import express from "express";
const router = express.Router();
import authRouter from "./auth";
import apiRouter from "./apiKey";

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/apiKey", apiRouter);

export default router;
