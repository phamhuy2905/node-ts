import { Furnitune, Product } from "~/models/product.model";
import { BadRequestError, ConflictError } from "~/responPhrase/errorResponse";
import ProductFactory from "./product.factory";

class FurnituneFactory extends ProductFactory {
    async createProduct() {
        const foundProduct = await Product.findOne({ productName: this.product_name });
        if (foundProduct) throw new ConflictError("Tên sản phẩm đã tồn tại!");

        const newFurnitune = await Furnitune.create({ ...this.product_attribute });
        if (!newFurnitune) throw new BadRequestError("Create furnitune wrong!!");
        const newProduct = await super.createProduct(newFurnitune._id);
        if (!newProduct) {
            await Furnitune.findByIdAndDelete(newFurnitune._id);
            throw new BadRequestError("Create product wrong!!");
        }
        return newProduct;
    }
}

export default FurnituneFactory;
