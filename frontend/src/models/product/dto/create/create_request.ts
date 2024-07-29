export default class CreateRequestDTO {
    constructor (
        private memo_id: number,
        private name: string
    ){}

    get getUserId(): number {
        return this.memo_id;
    }

    get getName(): string {
        return this.name;
    }

    json() {
        return {
            user_id: this.memo_id,
            name: this.name
        }
    }
}