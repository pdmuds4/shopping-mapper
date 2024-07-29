export default class MemoEntity {
    constructor(
        private id: number,
        private user_id: number,
        private title: string,
        private done: boolean
    ){}

    get getId(): number {
        return this.id;
    }

    json() {
        return {
            id: this.id,
            user_id: this.user_id,
            title: this.title,
            done: this.done
        }
    }
}