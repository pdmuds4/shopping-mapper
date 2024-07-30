export type FinishedRequest = {
    user_id: number;
}

export type FinishedResponse = {
    id: number;
    created_at: string;
    user_id: number;
    title: string;
    done: boolean;
}


export type FinishedError = {
    detail : {
        message: string;
    }
}