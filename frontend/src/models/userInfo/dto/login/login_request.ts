import { LoginRequest } from "./loginTypes"

export default class LoginRequestDTO {
    constructor(
        private mail_address?: string,
        private password?: string,
    ){}

    updateMailAddress(mail_address: string): LoginRequestDTO {
        return new LoginRequestDTO(mail_address, this.password)
    }

    updatePassword(password: string): LoginRequestDTO {
        return new LoginRequestDTO(this.mail_address, password)
    }

    hasEmptyProp(): boolean {
        return  this.mail_address === '' || 
                this.password === '' || 
                this.mail_address === undefined || 
                this.password === undefined
    }

    json(): LoginRequest {
        return {
            mail_address: this.mail_address,
            password: this.password,
        } as LoginRequest
    }
}