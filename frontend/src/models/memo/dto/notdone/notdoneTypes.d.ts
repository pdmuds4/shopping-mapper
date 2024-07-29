export type NotDoneRequest = {
    user_id: number;
}

export type NotDoneResponse = {
    id: number;
    user_id: number;
    title: string;
    done: boolean;
}

export type NotDoneError = {
    detail : {
        message: string;
    }
}