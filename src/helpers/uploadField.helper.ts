interface UploaddType {
    name: string;
    maxCount: number;
}

const fieldUploadProduct: UploaddType[] = [
    {
        name: "product_thumbnail",
        maxCount: 1,
    },
    {
        name: "product_multiple_thumbnail",
        maxCount: 20,
    },
];

export { fieldUploadProduct };
