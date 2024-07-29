export type LoginRequest = {
    mail_address: string;
    password: string;
}

export type LoginResponse = {
    id: number;
}

export type LoginError = {
    detail : {
        message: string;
    }
}