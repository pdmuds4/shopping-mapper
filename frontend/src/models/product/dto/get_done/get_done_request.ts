export default class GetDoneRequestDTO {
    constructor(
        private user_id: number
    ){}

    get getUserId(): number {
        return this.user_id;
    }
}