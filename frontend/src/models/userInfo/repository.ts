import { callAPI } from "@utils/callApi";
import { LoginRequestDTO } from "@domain/userInfo/dto";

export default class UserInfoRepository {
    //constructor() {}

    async getUserId(request: LoginRequestDTO) {
        const response = await callAPI(
            'POST',
            '/api/user/login',
            request.json()
        );

        return response;
    }

    async createUser(request: LoginRequestDTO) {
        const response = await callAPI(
            'POST',
            '/api/user/register',
            request.json()
        );

        return response;
    }
}