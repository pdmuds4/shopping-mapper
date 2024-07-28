import { NotFoundMemo } from "@components/RecordMemo";

const RecordMemo: React.FC = () => {
    return (
        <>
            <NotFoundMemo onCreateMemo={()=> console.log(1)}/>
        </>
    )
}

export default RecordMemo