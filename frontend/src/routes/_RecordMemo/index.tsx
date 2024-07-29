// import { useState, useEffect } from "react";

import { NotFoundMemo, /* MemoList , ViewMemo*/ } from "@components/RecordMemo";
// import { LoadingDrop } from "@components/ui";

// [TODO]: メモ履歴の取得処理を実装する
const RecordMemo: React.FC = () => {
    // const [mainComponent, setMainComponent] = useState<JSX.Element>(<NotFoundMemo />)
    // const [is_loading, setLoading] = useState(false)

    return (
        <>  
            <NotFoundMemo />
            {/* {mainComponent} */}
            {/* <LoadingDrop isOpen={is_loading} /> */}
        </>
    )
}

export default RecordMemo