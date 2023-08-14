import express from "express";
import ApiKeyController from "~/controllers/apiKey.controller";
const router = express.Router();

router.post("/", ApiKeyController.registerApiKey);

export default router;
