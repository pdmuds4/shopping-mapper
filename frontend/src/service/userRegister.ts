import UserInfoRepository from "@domain/userInfo/repository";
import { RegisterRequestDTO } from "@domain/userInfo/dto";

export default class UserRegisterUseCase {
    constructor(
        private repository: UserInfoRepository,
        private request: RegisterRequestDTO
    ) {}

    async execute() {
        return await this.repository.createUser(this.request);
    }
}