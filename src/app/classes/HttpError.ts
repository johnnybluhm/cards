export default class HttpError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public error?: any
    ) {
        super(message);
        this.name = "HttpError";
        this.statusCode = statusCode;
    }
}