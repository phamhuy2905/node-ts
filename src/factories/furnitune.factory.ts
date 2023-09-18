import { Furnitune, Product } from "~/models/product.model";
import { BadRequestError, ConflictError } from "~/responPhrase/errorResponse";
import ProductFactory from "./product.factory";

class FurnituneFactory extends ProductFactory {
    async createProduct() {
        const foundProduct = await Product.findOne({ productName: this.product_name, product_shop: this.product_shop });
        if (foundProduct) throw new ConflictError("Tên sản phẩm đã tồn tại!");

        const newFurnitune = await Furnitune.create({ ...this.product_attributes });
        if (!newFurnitune) throw new BadRequestError("Create furnitune wrong!!");
        const newProduct = await super.createProduct(newFurnitune._id);
        if (!newProduct) {
            await Furnitune.findByIdAndDelete(newFurnitune._id);
            throw new BadRequestError("Create product wrong!!");
        }
        return newProduct;
    }
    static async getProductById(id: string) {
        return await Furnitune.findById(id);
    }
}

export default FurnituneFactory;
