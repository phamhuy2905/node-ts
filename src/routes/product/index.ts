import express from "express";
import ProductController from "~/controllers/product.controller";
import { authentication, checkRole } from "~/middlewares/authentication";
import validator from "~/middlewares/validator";
import upload from "~/middlewares/upload";
import { createProduct } from "~/validations/product.validation";
import { fieldUploadProduct } from "~/helpers/uploadField.helper";
import { requiredId } from "~/validations/custom.validation";
const router = express.Router();

router.get("/", ProductController.getProduct);
router.get("/:id", validator(requiredId, null, "params"), ProductController.getProductById);
router.use(authentication, checkRole(["0001", "0002"]));
router.post(
    "/",
    upload.fields(fieldUploadProduct),
    validator(createProduct, ["product_attributes"]),
    ProductController.createProduct
);

export default router;
