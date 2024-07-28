export default class LoginResponseDTO {
    constructor(
        private id: number,
    ){}
    
    get getId(): number {
        return this.id;
    }
}