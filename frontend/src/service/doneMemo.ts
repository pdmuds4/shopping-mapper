import MemoRepository from "@domain/memo/repository";
import { DoneRequestDTO } from "@domain/memo/dto";

export default class DoneMemoUseCase {
    constructor(
        private repository: MemoRepository,
        private request: DoneRequestDTO,
    ) {}

    async execute() {
        return await this.repository.doneMemo(this.request);
    }
}