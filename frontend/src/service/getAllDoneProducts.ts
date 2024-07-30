import { GetDoneRequestDTO } from "@domain/product/dto";
import ProductRepository from "@domain/product/repository";

export default class GetAllDoneProductsUseCase {
    constructor(
        private repository : ProductRepository,
        private request : GetDoneRequestDTO,
    ){}

    async execute() {
        return this.repository.getAllDoneProducts(this.request);
    }
}