import { RegisterResponse } from "./registerTypes";

export default class RegisterResponseDTO {
    constructor(
        private id: number,
    ){}

    get getId(): number {
        return this.id;
    }
    
    json(): RegisterResponse {
        return {
            id: this.id
        }
    }
}