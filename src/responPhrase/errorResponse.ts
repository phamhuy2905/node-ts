import statusCode from "./statusCode";
import reasonPhrase from "./reasonPhrase";
class BadRequestError extends Error {
    public status: number;
    constructor(message: string = reasonPhrase.BAD_REQUEST, status: number = statusCode.BAD_REQUEST) {
        super(message);
        this.status = status;
    }
}

class ForbiddenError extends BadRequestError {
    constructor(message: string = reasonPhrase.FORBIDDEN, status: number = statusCode.FORBIDDEN) {
        super(message, status);
    }
}

class ConflictError extends BadRequestError {
    constructor(message: string = reasonPhrase.CONFLICT, status: number = statusCode.CONFLICT) {
        super(message, status);
    }
}

class UnprocessEntityError extends BadRequestError {
    constructor(message: string = reasonPhrase.UNPROCESSABLE_ENTITY, status: number = statusCode.UNPROCESSABLE_ENTITY) {
        super(message, status);
    }
}

class UnauthorizedError extends BadRequestError {
    constructor(message: string = reasonPhrase.UNAUTHORIZED, status: number = statusCode.UNAUTHORIZED) {
        super(message, status);
    }
}

export { BadRequestError, ForbiddenError, ConflictError, UnauthorizedError, UnprocessEntityError };
