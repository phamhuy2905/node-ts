const pickLodash = (object: any, fields: string[]) => {
    const rest = { ...object };
    Object.keys(rest).forEach((val) => {
        if (!fields.includes(val)) {
            delete rest[val];
        }
    });
    return rest;
};

const omitLodahs = (object: any, fields: string[]) => {
    const rest = { ...object };
    Object.keys(rest).forEach((val) => {
        if (fields.includes(val)) {
            delete rest[val];
        }
    });
    return rest;
};

export { pickLodash, omitLodahs };
