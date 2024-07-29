export type CreateRequest = {
    user_id: number;
    title: string;
}

export type CreateResponse = {
    id: number;
    user_id: number;
    title: string;
    done: boolean;
}