import { LoginResponse } from "./loginTypes";

export default class LoginResponseDTO {
    constructor(
        private id: number,
    ){}
    
    get getId(): number {
        return this.id;
    }


    json(): LoginResponse {
        return {
            id: this.id
        }
    }
}