export type CreateRequest = {
    memo_id: number;
    name: string;
}

export type CreateResponse = {
    id: number;
    user_id: number;
    title: string;
    done: boolean;
}