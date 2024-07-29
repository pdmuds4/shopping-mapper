export default class DoneRequestDTO {
    constructor(
        private memo_id: number
    ){}

    get getMemoId(): number {
        return this.memo_id;
    }
}