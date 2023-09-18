import { Product } from "~/models/product.model";
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
    static async getProductById(id: string) {
        const product = await Product.findById(id).lean();
        if (!product) return null;
        const type = product?.product_type as ProductType;
        const productClass = ProductService.productRegistry[type];
        const product_attributes = await productClass.getProductById(id);
        return {
            ...product,
            product_attributes,
        };
    }

    static async getProduct() {
        const products = await Product.findOne().lean();
        return Array(10).fill(products);
    }
}

export default ProductService;
