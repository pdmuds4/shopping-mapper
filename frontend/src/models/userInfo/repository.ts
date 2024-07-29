import { callAPI } from "@utils/callApi";
import { LoginRequestDTO, LoginResponseDTO, LoginErrorDTO,
         RegisterRequestDTO, RegisterResponseDTO, RegisterErrorDTO
} from "@domain/userInfo/dto";

export default class UserInfoRepository {
    //constructor() {}

    async getUserId(request: LoginRequestDTO): Promise<LoginResponseDTO | LoginErrorDTO> {
        try {
            const response = await callAPI(
                'POST',
                '/api/user/login',
                request.json()
            );

            return new LoginResponseDTO(response.id);
        } catch (error: unknown) {
            if (error instanceof Error) return new LoginErrorDTO(error.message === '' ? '不明なエラーが発生しました' : error.message);
            else                        return new LoginErrorDTO('不明なエラーが発生しました');
        }
    }

    async createUser(request: RegisterRequestDTO): Promise<RegisterResponseDTO | RegisterErrorDTO> {
        try {
            const response = await callAPI(
                'POST',
                '/api/user/register',
                request.json()
            )

            return new RegisterResponseDTO(response.id);
        } catch (error: unknown) {
            if (error instanceof Error) return new RegisterErrorDTO(error.message === '' ? '不明なエラーが発生しました' : error.message);
            else                        return new RegisterErrorDTO('不明なエラーが発生しました');
        }
    }
}