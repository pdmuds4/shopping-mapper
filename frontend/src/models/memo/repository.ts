import { callAPI } from "@utils/callApi";

import MemoEntity from "./entity";
import { NotDoneResponse } from "@domain/memo/dto/notdone/notdoneTypes";
import { CreateResponse } from "@domain/memo/dto/create/createTypes";
import { FinishedResponse } from "@domain/memo/dto/finished/finishedTypes";
import { NotDoneRequestDTO, NotDoneErrorDTO, CreateMemoRequestDTO, FinishedRequestDTO, FinishedErrorDTO } from "@domain/memo/dto";
import DoneRequestDTO from "./dto/done/done_request";

export default class MemoRepository {

    async getNotDoneMemo(request: NotDoneRequestDTO): Promise<MemoEntity | NotDoneErrorDTO> {
        try {
            const response = await callAPI(
                'GET',
                `/api/memo/not_done/${request.getUserId}`
            ) as NotDoneResponse[];
            
            const recent_notdone_memo: NotDoneResponse = response[0];
            return new MemoEntity(
                recent_notdone_memo.id,
                new Date(recent_notdone_memo.created_at),
                recent_notdone_memo.user_id,
                recent_notdone_memo.title,
                recent_notdone_memo.done,
            );
        } catch (error: unknown) {
            if (error instanceof Error) return new NotDoneErrorDTO(error.message === '' ? '不明なエラーが発生しました' : error.message);
            else                        return new NotDoneErrorDTO('不明なエラーが発生しました');
        }
    }

    async getFinishedMemo(request: FinishedRequestDTO): Promise<MemoEntity[]|FinishedErrorDTO> {
        try {
            const response = await callAPI(
                'GET',
                `/api/memo/done/${request.getUserId}`
            ) as FinishedResponse[];
    
            return response.map((memo) => {
                return new MemoEntity(
                    memo.id,
                    new Date(memo.created_at),
                    memo.user_id,
                    memo.title,
                    memo.done,
                );
            });
        } catch (error: unknown) {
            if (error instanceof Error) return new FinishedErrorDTO(error.message === '' ? '不明なエラーが発生しました' : error.message);
            else                        return new FinishedErrorDTO('不明なエラーが発生しました');
        }
    }

    async createMemo(request: CreateMemoRequestDTO): Promise<MemoEntity> {
        const response = await callAPI(
            'POST',
            '/api/memo/',
            request.json()
        ) as CreateResponse;
        
        return new MemoEntity(
            response.id,
            new Date(response.created_at),
            response.user_id,
            response.title,
            response.done,
        );
    }

    async doneMemo(request: DoneRequestDTO) {
        const response = await callAPI(
            'PATCH',
            `/api/memo/mark_up/${request.getMemoId}`
        );

        return response;
    }
}