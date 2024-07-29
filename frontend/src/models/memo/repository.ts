import { callAPI } from "@utils/callApi";
import { NotDoneResponse } from "@domain/memo/dto/notdone/notdoneTypes";
import { NotDoneRequestDTO, NotDoneResponseDTO, NotDoneErrorDTO } from "@domain/memo/dto";

export default class MemoRepository {

    async getNotDoneMemo(request: NotDoneRequestDTO): Promise<NotDoneResponseDTO | NotDoneErrorDTO> {
        try {
            const response = await callAPI(
                'GET',
                `/api/memo/not_done/${request.getUserId}`
            ) as NotDoneResponse[];
            
            const recent_notdone_memo: NotDoneResponse = response[0];
            return new NotDoneResponseDTO(
                recent_notdone_memo.id,
                recent_notdone_memo.user_id,
                recent_notdone_memo.title,
                recent_notdone_memo.done,
            );
        } catch (error: unknown) {
            if (error instanceof Error) return new NotDoneErrorDTO(error.message === '' ? '不明なエラーが発生しました' : error.message);
            else                        return new NotDoneErrorDTO('不明なエラーが発生しました');
        }
    }
}