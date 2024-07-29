import { useState, useEffect } from "react"

import { ViewMemo, NotFoundMemo, EditMemo } from "@components/CurrentMemo"
import { LoadingDrop } from "@components/ui"

import GetCurrentMemoUseCase from "@usecase/getCurrentMemo"
import MemoRepository from "@domain/memo/repository"
import { NotDoneErrorDTO, NotDoneRequestDTO, NotDoneResponseDTO } from "@domain/memo/dto"


const CurrentMemo: React.FC = () => {
    const [mainComponent, setMainComponent] = useState<JSX.Element>()
    const [current_memo, setCurrentMemo] = useState<NotDoneResponseDTO>()

    const [is_loading, setLoading] = useState(true)

    useEffect(()=>{
        const user_id = localStorage.getItem('user_id')

        if (user_id) {
            new GetCurrentMemoUseCase(
                new MemoRepository, 
                new NotDoneRequestDTO(parseInt(user_id))
            ).execute()
                .then((response: NotDoneResponseDTO | NotDoneErrorDTO ) => {
                    console.log(response);
                    
                    if (response instanceof NotDoneResponseDTO) {
                        setCurrentMemo(response)
                        setMainComponent(
                            <ViewMemo />
                        )
                    } else if (response instanceof NotDoneErrorDTO) {
                        setMainComponent(
                            <NotFoundMemo 
                                onCreateMemo={()=>setMainComponent(<EditMemo />)} 
                            />
                        )
                    }
                }).finally(()=>{
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

export default CurrentMemo