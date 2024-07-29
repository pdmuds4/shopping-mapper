import { LoginError } from "./loginTypes";

export default class LoginErrorDTO {
    constructor(
        private message: string,
    ){}

    get getMessage() {
        return this.message;
    }
    
    json(): LoginError {
        return {
            detail: {
                message: this.message,
            }
        }
    }
}