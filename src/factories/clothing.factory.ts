import { Clothing, Product } from "~/models/product.model";
import { BadRequestError, ConflictError } from "~/responPhrase/errorResponse";
import ProductFactory from "./product.factory";

class ClothingFactory extends ProductFactory {
    async createProduct() {
        const foundProduct = await Product.findOne({ productName: this.product_name });
        if (foundProduct) throw new ConflictError("Tên sản phẩm đã tồn tại!");

        const newClothing = await Clothing.create({ ...this.product_attribute });
        if (!newClothing) throw new BadRequestError("Create clothing wrong!!");
        const newProduct = await super.createProduct(newClothing._id);
        if (!newProduct) {
            await Clothing.findByIdAndDelete(newClothing._id);
            throw new BadRequestError("Create product wrong!!");
        }
        return newProduct;
    }
}

export default ClothingFactory;
