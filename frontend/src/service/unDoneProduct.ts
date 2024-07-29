import ProductRepository from "@domain/product/repository";
import { UndoneRequestDTO } from "@domain/product/dto";

export default class UnDoneProductUseCase {
    constructor(
        private repository: ProductRepository,
        private request: UndoneRequestDTO,
    ) {}

    async execute() {
        return await this.repository.undoneProduct(this.request);
    }
}