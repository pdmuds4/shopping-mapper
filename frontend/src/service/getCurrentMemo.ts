import MemoRepository from "@domain/memo/repository";
import { NotDoneRequestDTO } from "@domain/memo/dto";

export default class GetCurrentMemoUseCase {
    constructor(
        private repository: MemoRepository,
        private request: NotDoneRequestDTO
    ) {}

    async execute() {
        return await this.repository.getNotDoneMemo(this.request);
    }
}