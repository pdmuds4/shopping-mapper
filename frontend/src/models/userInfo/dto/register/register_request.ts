import { RegisterRequest } from "./registerTypes"

export default class RegisterRequestDTO {
    constructor(
        private mail_address?: string,
        private password?: string,
    ){}

    equalsMailAddress(second_mail_address: string | null): boolean {
        if (second_mail_address) return this.mail_address === second_mail_address
        else return true;
    }

    updateMailAddress(mail_address: string): RegisterRequestDTO {
        return new RegisterRequestDTO(mail_address, this.password)
    }

    updatePassword(password: string): RegisterRequestDTO {
        return new RegisterRequestDTO(this.mail_address, password)
    }

    hasEmptyProp(): boolean {
        return  this.mail_address === '' || 
                this.password === '' || 
                this.mail_address === undefined || 
                this.password === undefined
    }

    json(): RegisterRequest {
        return {
            mail_address: this.mail_address,
            password: this.password,
        } as RegisterRequest
    }
}