export default class FinishedRequestDTO {
    constructor(
        private user_id: number
    ){}

    get getUserId(): number {
        return this.user_id;
    }
}