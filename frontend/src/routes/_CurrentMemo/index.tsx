import { useState, useEffect } from "react"

import { ViewMemo, NotFoundMemo, CreateMemo } from "@components/CurrentMemo"
import { LoadingDrop } from "@components/ui"

import GetCurrentMemoUseCase from "@usecase/getCurrentMemo"
import MemoRepository from "@domain/memo/repository"
import MemoEntity from "@domain/memo/entity"
import { NotDoneErrorDTO, NotDoneRequestDTO } from "@domain/memo/dto"

const CurrentMemo: React.FC = () => {
    const [mainComponent, setMainComponent] = useState<JSX.Element>()
    const [is_loading, setLoading] = useState(true)

    useEffect(()=>{
        const user_id = localStorage.getItem('user_id')

        if (user_id) {
            new GetCurrentMemoUseCase(
                new MemoRepository, 
                new NotDoneRequestDTO(parseInt(user_id))
            ).execute()
                .then((response: MemoEntity | NotDoneErrorDTO ) => {
                    console.log(response);
                    
                    if (response instanceof MemoEntity) {
                        setMainComponent(
                            <ViewMemo 
                                memoEntity={response} 
                            />
                        )
                    } else if (response instanceof NotDoneErrorDTO) {
                        setMainComponent(
                            <NotFoundMemo 
                                onCreateMemo={()=>setMainComponent(
                                    <CreateMemo 
                                        toViewMemo={(memo_entity)=>
                                            setMainComponent(
                                                <ViewMemo 
                                                    memoEntity={memo_entity}
                                                />
                                        )}
                                    />
                                )} 
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