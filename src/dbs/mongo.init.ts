import mongoose from "mongoose";
import config from "../configs/index";

const {
    db: { host, name, port },
} = config;

class Database {
    static instance: Database;
    constructor() {
        this.connect();
    }

    connect() {
        mongoose
            .connect(`mongodb://${host}:${port}/${name}`)
            .then(() => console.log("Connect mongodb is sucessfully!!"))
            .catch(() => console.log("Connect mongodb error"));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instace = Database.getInstance();
export default instace;
