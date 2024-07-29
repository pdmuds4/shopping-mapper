import ProductRepository from "@domain/product/repository";
import { DoneRequestDTO } from "@domain/product/dto";

export default class DoneProductUseCase {
    constructor(
        private repository: ProductRepository,
        private request: DoneRequestDTO,
    ) {}

    async execute() {
        return await this.repository.doneProduct(this.request);
    }
}