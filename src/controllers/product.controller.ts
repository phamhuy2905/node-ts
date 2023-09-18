import asyncHandle from "~/middlewares/asyncHandle";
import { CREATED } from "../responPhrase/successResponse";
import ProductService from "~/services/product.service";

class ProductController {
    static createProduct = asyncHandle(async (req, res, _next) => {
        const payload = { ...req.body, product_shop: req.user_id };
        const type = payload.product_type;
        return new CREATED({ data: await ProductService.createProduct({ type, payload }) }).send(res);
    });
    static getProduct = asyncHandle(async (req, res, _next) => {
        return new CREATED({ data: await ProductService.getProduct() }).send(res);
    });
    static getProductById = asyncHandle(async (req, res, _next) => {
        return new CREATED({ data: await ProductService.getProductById(req.params.id) }).send(res);
    });
}

export default ProductController;
