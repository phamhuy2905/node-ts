import express from "express";
const router = express.Router();
import authRouter from "./auth";
import apiRouter from "./apiKey";
import productRouter from "./product";

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/apiKey", apiRouter);
router.use("/api/v1/product", productRouter);

export default router;
