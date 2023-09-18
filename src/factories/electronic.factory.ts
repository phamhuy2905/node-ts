import { Electronic, Product } from "~/models/product.model";
import { BadRequestError, ConflictError } from "~/responPhrase/errorResponse";
import ProductFactory from "./product.factory";
class ElectronicFactory extends ProductFactory {
    async createProduct() {
        const foundProduct = await Product.findOne({ productName: this.product_name, product_shop: this.product_shop });
        if (foundProduct) throw new ConflictError("Tên sản phẩm đã tồn tại!");

        const newElectronic = await Electronic.create({ ...this.product_attributes });
        if (!newElectronic) throw new BadRequestError("Create furnitune wrong!!");
        const newProduct = await super.createProduct(newElectronic._id);
        if (!newProduct) {
            await Electronic.findByIdAndDelete(newElectronic._id);
            throw new BadRequestError("Create product wrong!!");
        }
        return newProduct;
    }
    static async getProductById(id: string) {
        return await Electronic.findById(id);
    }
}

export default ElectronicFactory;
