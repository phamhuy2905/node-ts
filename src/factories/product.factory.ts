import { Product } from "~/models/product.model";
import { ObjectId } from "~/types";

interface ProductType {
    product_shop: ObjectId;
    product_name: string;
    product_sold: number;
    product_type: string;
    product_thumbnail: string;
    product_multiple_thumbnail: string[];
    product_price: number;
    product_short_desc: string;
    product_long_desc: string;
    product_attributes: any;
}

class ProductFactory {
    public product_shop: ObjectId;
    public product_name: string = "";
    public product_slug: string = "";
    public product_sold: number = 0;
    public product_type: string = "";
    public product_thumbnail = "";
    public product_multiple_thumbnail: string[] = [];
    public product_price: number = 0;
    public product_short_desc: string = "";
    public product_long_desc: string = "";
    public product_attributes: any = {};

    constructor({
        product_shop,
        product_name,
        product_sold,
        product_type,
        product_thumbnail,
        product_multiple_thumbnail,
        product_price,
        product_short_desc,
        product_long_desc,
        product_attributes,
    }: ProductType) {
        (this.product_shop = product_shop),
            (this.product_name = product_name),
            (this.product_sold = product_sold),
            (this.product_type = product_type),
            (this.product_thumbnail = product_thumbnail),
            (this.product_multiple_thumbnail = product_multiple_thumbnail),
            (this.product_price = product_price),
            (this.product_short_desc = product_short_desc),
            (this.product_long_desc = product_long_desc),
            (this.product_attributes = product_attributes);
    }

    async createProduct(_id: ObjectId) {
        const newProduct = await Product.create({ ...this, _id });
        return newProduct;
    }
}

export default ProductFactory;
