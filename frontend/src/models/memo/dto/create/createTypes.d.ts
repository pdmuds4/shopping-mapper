export type CreateRequest = {
    user_id: number;
    title: string;
}

export type CreateResponse = {
    id: number;
    created_at: string;
    user_id: number;
    title: string;
    done: boolean;
}