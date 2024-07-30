export default class MemoEntity {
    constructor(
        private id: number,
        private created_at: Date,
        private user_id: number,
        private title: string,
        private done: boolean
    ){}

    get getId(): number {
        return this.id;
    }

    get getTitle(): string {
        return this.title;
    }

    get getCreatedAt(): string {
        return this.created_at.toLocaleString();
    }

    json() {
        return {
            id: this.id,
            created_at: this.created_at,
            user_id: this.user_id,
            title: this.title,
            done: this.done
        }
    }
}