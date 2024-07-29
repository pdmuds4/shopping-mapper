import ProductRepository from "@domain/product/repository";
import { GetMemoRequestDTO } from "@domain/product/dto";

export default class GetMemoProductsUseCase {
    constructor(
        private repository: ProductRepository,
        private request: GetMemoRequestDTO
    ) {}

    async execute() {
        return await this.repository.getMemoProducts(this.request);
    }
}