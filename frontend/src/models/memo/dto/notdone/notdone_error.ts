import { NotDoneError } from "./notdoneTypes";

export default class NotDoneErrorDTO {
    constructor(
        private message: string,
    ){}

    get getMessage() {
        return this.message;
    }
    
    json(): NotDoneError {
        return {
            detail: {
                message: this.message,
            }
        }
    }
}