export default class GetMemoRequestDTO {
    constructor(
        private memo_id: number
    ){}

    get getMemoId(): number {
        return this.memo_id;
    }
}