export default class DoneRequestDTO {
    constructor(
        private product_id: number,
    ){}

    get getProductId() {
        return this.product_id;
    }
}