import { createClient } from "redis";

const client = createClient();

client.connect().then(() => console.log("Connect redis ok"));

const get = async (key: string) => {
    const result = await client.get(key);
    return result;
};

const set = async (key: string, value: any) => {
    const result = await client.set(key, value);
    return result;
};

const incrBy = async (key: string, incr: number) => {
    const result = await client.incrBy(key, incr);
    return result;
};

const decrBy = async (key: string, incr: number) => {
    const result = await client.decrBy(key, incr);
    return result;
};

const setNX = async (key: string, value: any) => {
    const result = await client.setNX(key, value);
    return result;
};

const setEx = async (key: string, second: number, value: string) => {
    const result = await client.setEx(key, second, value);
    return result;
};

const exists = async (key: string) => {
    const result = await client.exists(key);
    return result;
};

export { get, set, incrBy, decrBy, setEx, setNX, exists };
