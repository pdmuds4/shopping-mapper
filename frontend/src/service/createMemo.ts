import MemoRepository from "@domain/memo/repository";
import { CreateMemoRequestDTO } from "@domain/memo/dto";

export default class CreateMemoUseCase {
    constructor(
        private repository: MemoRepository,
        private request: CreateMemoRequestDTO,
    ) {}

    async execute() {
        return await this.repository.createMemo(this.request);
    }
}