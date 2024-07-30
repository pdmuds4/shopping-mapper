import { useState, useEffect } from "react";

import { MemoList, ViewMemo, NotFoundMemo } from "@components/RecordMemo";
import { LoadingDrop } from "@components/ui";

import GetFinishedMemoUseCase from "@usecase/getfinishedMemo";
import MemoRepository from "@domain/memo/repository";
import MemoEntity from "@domain/memo/entity";
import { FinishedErrorDTO, FinishedRequestDTO } from "@domain/memo/dto";


// [TODO]: メモ履歴の取得処理を実装する
const RecordMemo: React.FC = () => {
    const [mainComponent, setMainComponent] = useState<JSX.Element>();
    const [is_loading, setLoading] = useState(true)


    useEffect(()=>{
        const user_id = localStorage.getItem('user_id')

        if (user_id) {
            new GetFinishedMemoUseCase(
                new MemoRepository,
                new FinishedRequestDTO(parseInt(user_id))
            ).execute()
            .then((response: MemoEntity[] | FinishedErrorDTO)=>{
                console.log(response);

                if (response instanceof FinishedErrorDTO) {
                    setMainComponent(
                        <NotFoundMemo />
                    )
                } else {
                    setMainComponent(
                        <MemoList 
                            memo_list={response} 
                            toViewMemo={(memo: MemoEntity)=>
                                setMainComponent(<ViewMemo memo_entity={memo} />)
                            }
                        />
                    )
                }
            })
            .finally(()=>{
                setLoading(false)
            })
        }
    },[])

    return (
        <>  
            {mainComponent}
            <LoadingDrop isOpen={is_loading} />
        </>
    )
}

export default RecordMemo