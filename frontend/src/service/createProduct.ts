import ProductRepository from "@domain/product/repository";
import { CreateProductRequestDTO } from "@domain/product/dto";

export default class CreateProductUseCase {
    constructor(
        private repository: ProductRepository,
        private request: CreateProductRequestDTO,
    ) {}

    async execute() {
        return await this.repository.createProduct(this.request);
    }
}