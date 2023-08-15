import { BadRequestError } from "~/responPhrase/errorResponse";

type ProductRegistry = {
    Clothing: any;
    Electronic: any;
    Furnitune: any;
};

type ProductType = "Clothing" | "Electronic" | "Furnitune";

class ProductService {
    static productRegistry: ProductRegistry = {
        Clothing: null,
        Electronic: null,
        Furnitune: null,
    };

    static registryProductType(type: ProductType, classRef: any) {
        ProductService.productRegistry[type] = classRef;
    }

    static async createProduct({ type, payload }: { type: ProductType; payload: any }) {
        const productClass = ProductService.productRegistry[type];
        if (!productClass) throw new BadRequestError("Loại sản phẩm không hợp lệ!!");
        return new productClass(payload).createProduct();
    }
}

export default ProductService;
