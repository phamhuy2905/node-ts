import statusCode from "./statusCode";
import reasonPhrase from "./reasonPhrase";
import { Response } from "express";

class OK {
    public data: any;
    public message: string;
    public status: number;
    constructor({
        data,
        message = reasonPhrase.OK,
        status = statusCode.OK,
    }: {
        data: any;
        message?: string;
        status?: number;
    }) {
        this.data = data;
        this.message = message;
        this.status = status;
    }

    send(res: Response) {
        res.status(200).json({
            success: true,
            messsage: this.message,
            data: this.data,
        });
    }
}

class CREATED extends OK {
    public data: any;
    public message: string;
    public status: number;
    constructor({
        data,
        message = reasonPhrase.OK,
        status = statusCode.OK,
    }: {
        data: any;
        message?: string;
        status?: number;
    }) {
        super({ data, message, status });
        this.data = data;
        this.message = message;
        this.status = status;
    }
}

export { OK, CREATED };
