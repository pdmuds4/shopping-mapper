export default class ProductEntity {
    constructor(
        private id: number,
        private memo_id: number,
        private name: string,
        private is_done: boolean,
        private created_at: string,
        private latitude: number,
        private longitude: number,
        private price: number,
    ){}

    get getId() {
        return this.id;
    }

    get getName() {
        return this.name;
    }

    get getIsDone() {
        return this.is_done;
    }

    json() {
        return {
            id: this.id,
            memo_id: this.memo_id,
            name: this.name,
            is_done: this.is_done,
            created_at: this.created_at,
            latitude: this.latitude,
            longitude: this.longitude,
            price: this.price,
        }
    }
}