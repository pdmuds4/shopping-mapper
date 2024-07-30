import MemoRepository from "@domain/memo/repository";
import { FinishedRequestDTO } from "@domain/memo/dto";

export default class GetFinishedMemoUseCase {
    constructor(
        private repository: MemoRepository,
        private request: FinishedRequestDTO
    ) {}
    
    async execute() {
        return await this.repository.getFinishedMemo(this.request);
    }
}