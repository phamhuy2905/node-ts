type ProductType = "Clothing" | "Electronic";

import fs from "fs";
import ProductService from "../services/product.service";

const capitazileFirstLetter = (letter: string) => {
    return letter[0].toUpperCase() + letter.slice(1);
};
const registerFactory = () => {
    const filesFactory = fs.readdirSync("./src/factories");

    filesFactory.forEach((fileName) => {
        if (fileName.includes("factory") && !fileName.includes("product")) {
            const type = capitazileFirstLetter(fileName.split(".")[0]) as ProductType;
            const classRef = type.toLowerCase();
            import(`./${classRef}.factory`).then((factory) => {
                ProductService.registryProductType(type, factory);
            });
        }
    });
};
export default registerFactory;
