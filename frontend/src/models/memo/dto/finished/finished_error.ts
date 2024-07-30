import { FinishedError } from "./finishedTypes";

export default class FinishedErrorDTO {
    constructor(
        private message: string,
    ){}

    get getMessage() {
        return this.message;
    }
    
    json(): FinishedError {
        return {
            detail: {
                message: this.message,
            }
        }
    }
}