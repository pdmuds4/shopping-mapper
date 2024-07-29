import { RegisterError } from "./registerTypes";

export default class RegisterErrorDTO {
    constructor(
        private message: string,
    ){}

    get getMessage(): string {
        return this.message;
    }
    
    json(): RegisterError {
        return {
            detail: {
                message: this.message,
            }
        }
    }
}