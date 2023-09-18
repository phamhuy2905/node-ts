import Joi from "joi";

interface CreateProduct {
    product_name: string;
    product_type: string;
    product_thumbnail: string;
    product_multiple_thumbnail: string[];
    product_price: number;
    product_short_desc: string;
    product_long_desc: string;
    product_attribute: any;
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

const createClothing = Joi.object<ClothingType>({
    material: Joi.string().min(3).required(),
    brand: Joi.string().min(3).required(),
    options: Joi.array().items(
        Joi.object({
            k: Joi.string().allow(null),
            v: Joi.string().allow(null),
        })
    ),
});
const createElectronic = Joi.object<FurnituneType>({
    brand: Joi.string().min(3).required(),
    material: Joi.string().min(3).required(),
    options: Joi.array().items(
        Joi.object({
            k: Joi.string().allow(null),
            v: Joi.string().allow(null),
        })
    ),
});
const createFuritune = Joi.object<ElectronicType>({
    manufacture: Joi.string().min(3).required(),
    brand: Joi.string().min(3).required(),
    material: Joi.string().min(3).required(),
    options: Joi.array().items(
        Joi.object({
            k: Joi.string().allow(null),
            v: Joi.string().allow(null),
        })
    ),
});

const createProduct = Joi.object<CreateProduct>({
    product_name: Joi.string().min(3).required(),
    product_type: Joi.string().valid("Electronic", "Clothing", "Furniture").required(),
    product_thumbnail: Joi.string().required(),
    product_multiple_thumbnail: Joi.array().items(Joi.string()).min(3).required(),
    product_price: Joi.number().min(0).required(),
    product_short_desc: Joi.string().min(30).required(),
    product_long_desc: Joi.string().allow(null),
})
    .when(
        Joi.object({
            product_type: Joi.string().valid("Clothing").required(),
        }).unknown(),
        {
            then: Joi.object({
                product_attributes: createClothing,
            }),
        }
    )
    .when(
        Joi.object({
            product_type: Joi.string().valid("Electronic").required(),
        }).unknown(),
        {
            then: Joi.object({
                product_attributes: createElectronic,
            }),
        }
    )
    .when(
        Joi.object({
            product_type: Joi.string().valid("Furniture").required(),
        }).unknown(),
        {
            then: Joi.object({
                product_attributes: createFuritune,
            }),
        }
    );
export { createProduct };
