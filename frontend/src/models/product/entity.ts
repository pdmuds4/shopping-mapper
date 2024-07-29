export default class ProductEntity {
    constructor(
        private id: number,
        private memo_id: number,
        private is_done: boolean,
        private created_at: string,
        private latitude: number,
        private longitude: number,
        private price: number,
    ){}

    json() {
        return {
            id: this.id,
            memo_id: this.memo_id,
            is_done: this.is_done,
            created_at: this.created_at,
            latitude: this.latitude,
            longitude: this.longitude,
            price: this.price,
        }
    }
}