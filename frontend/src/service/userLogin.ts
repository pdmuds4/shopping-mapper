import UserInfoRepository from "@domain/userInfo/repository";
import { LoginRequestDTO } from "@domain/userInfo/dto";

export default class UserLoginUseCase {
    constructor(
        private repository: UserInfoRepository,
        private request: LoginRequestDTO
    ) {}

    async execute() {
        return await this.repository.getUserId(this.request);
    }
}