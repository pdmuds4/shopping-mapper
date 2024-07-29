export default class DoneRequestDTO {
    constructor(
        private product_id: number,
        private latitude: number,
        private longitude: number,
        private price: number,
    ){}

    json() {
        return {
            product_id: this.product_id,
            latitude: this.latitude,
            longitude: this.longitude,
            price: this.price,
        }
    }
}