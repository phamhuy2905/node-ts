import mongoose, { ObjectId, Types } from "mongoose";
const Schema = mongoose.Schema;
const model: { NAME_COLLECTION: string } = {
    NAME_COLLECTION: "Varations",
};

interface VariationType {
    variation_shop: mongoose.SchemaDefinitionProperty<Types.ObjectId> | undefined;
    variation_product: mongoose.SchemaDefinitionProperty<Types.ObjectId> | undefined;
    variation_size: [
        {
            size: string;
            quantity: number;
            sold: number;
        }
    ];
    variation_color: [
        {
            color: string;
            quantity: number;
            sold: number;
        }
    ];
}

const variationSchema = new Schema<VariationType>({
    variation_shop: {
        type: mongoose.Schema.ObjectId,
        required: true,
        validate: {
            validator: async (val: Types.ObjectId) => {
                const foundUser = await mongoose.models.User.findById(val).lean();
                return foundUser ? true : false;
            },
            message: "User id không hợp lệ!",
        },
    },
    variation_product: {
        type: mongoose.Schema.ObjectId,
        required: true,
        validate: {
            validator: async (val: Types.ObjectId) => {
                const foundProduct = await mongoose.models.Product.findById(val).lean();
                return foundProduct ? true : false;
            },
            message: "User id không hợp lệ!",
        },
        ref: "Product",
    },
    variation_size: {
        type: [
            {
                size: String,
                quantity: Number,
                sold: Number,
            },
        ],
        default: [],
    },
    variation_color: {
        type: [
            {
                color: String,
                quantity: Number,
                sold: Number,
            },
        ],
        default: [],
    },
});
const Variation = mongoose.model(model.NAME_COLLECTION, variationSchema);

export default Variation;
