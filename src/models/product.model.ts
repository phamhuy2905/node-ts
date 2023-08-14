import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const model: { NAME_COLLECTION: string; CLOTHING_COLLECTION: string; ELECTRONIC: string; FURNITUNE: string } = {
    NAME_COLLECTION: "Product",
    CLOTHING_COLLECTION: "Clothing",
    ELECTRONIC: "Electronic",
    FURNITUNE: "Electronic",
};

interface ProductType {
    product_shop: mongoose.SchemaDefinitionProperty<Types.ObjectId> | undefined;
    product_name: string;
    product_slug: string;
    product_sold: number;
    product_type: string;
    product_thumbnail: string;
    product_multiple_thumbnail: string[];
    product_price: number;
    product_short_desc: string;
    product_long_desc: string;
}

interface ClothingType {
    material: string;
    brand: string;
    options: [
        {
            k: string;
            v: string;
        }
    ];
}
interface ElectronicType {
    manufacture: string;
    brand: string;
    material: string;
    options: [
        {
            k: string;
            v: string;
        }
    ];
}
interface FurnituneType {
    brand: string;
    material: string;
    options: [
        {
            k: string;
            v: string;
        }
    ];
}

const productSchema = new Schema<ProductType>(
    {
        product_shop: {
            type: mongoose.Schema.ObjectId,
            required: true,
            validate: {
                validator: async (val: Types.ObjectId) => {
                    const foundUser = await mongoose.models.User.findById(val).lean();
                    return foundUser ? true : false;
                },
                message: "User id không hợp lệ!",
            },
            ref: "User",
        },
        product_name: {
            type: String,
            required: true,
        },
        product_slug: {
            type: String,
        },
        product_sold: {
            type: Number,
            required: true,
            default: 0,
        },
        product_type: {
            type: String,
            required: true,
        },
        product_thumbnail: {
            type: String,
            required: true,
        },
        product_multiple_thumbnail: {
            type: [String],
            required: true,
        },
        product_price: {
            type: Number,
            required: true,
        },
        product_short_desc: {
            type: String,
            required: true,
        },
        product_long_desc: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const clothingSchema = new Schema<ClothingType>({
    brand: {
        type: String,
    },
    material: {
        type: String,
    },
    options: {
        type: [
            {
                k: { type: String },
                v: { type: String },
            },
        ],
    },
});
const electronicSchema = new Schema<ElectronicType>({
    brand: {
        type: String,
    },
    material: {
        type: String,
    },
    manufacture: {
        type: String,
    },
    options: {
        type: [
            {
                k: { type: String },
                v: { type: String },
            },
        ],
    },
});
const furnituneSchema = new Schema<FurnituneType>({
    brand: {
        type: String,
    },
    material: {
        type: String,
    },
    options: {
        type: [
            {
                k: { type: String },
                v: { type: String },
            },
        ],
    },
});

const Product = mongoose.model(model.NAME_COLLECTION, productSchema);
const Electronic = mongoose.model(model.ELECTRONIC, productSchema);
const Clothing = mongoose.model(model.CLOTHING_COLLECTION, productSchema);
const Furnitune = mongoose.model(model.FURNITUNE, productSchema);

export { Product, Electronic, Clothing, Furnitune };
