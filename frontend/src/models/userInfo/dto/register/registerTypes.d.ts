export type RegisterRequest = {
    mail_address: string;
    password: string;
}

export type RegisterResponse = {
    id: number;
}

export type RegisterError = {
    detail : {
        message: string;
    }
}