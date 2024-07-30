export default class ProductEntity {
    constructor(
        private id: number,
        private memo_id: number,
        private name: string,
        private is_done: boolean,
        private created_at: Date,
        private latitude: number,
        private longitude: number,
        private price: number,
    ){}

    get getId(): number {
        return this.id;
    }

    get getName(): string {
        return this.name;
    }

    get getIsDone(): boolean {
        return this.is_done;
    }

    get getCreatedAt(): string {
        return this.created_at.toLocaleString();
    }

    get getLocation(): {lat: number, lng: number} {
        return {lat: this.latitude, lng: this.longitude}
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