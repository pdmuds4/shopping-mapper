import { NotDoneResponse } from "./notdoneTypes";

export default class NotDoneResponseDTO {
    constructor(
        private id: number,
        private user_id: number,
        private title: string,
        private done: boolean
    ){}

    json(): NotDoneResponse {
        return {
            id: this.id,
            user_id: this.user_id,
            title: this.title,
            done: this.done
        }
    }
}