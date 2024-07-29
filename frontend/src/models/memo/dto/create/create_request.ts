export default class CreateRequestDTO {
    constructor (
        private user_id: number,
        private title: string
    ){}

    updateTitle(title: string) {
        return new CreateRequestDTO(this.user_id, title);
    }

    titleIsEmpty() {
        return this.title === '';
    }

    get getUserId(): number {
        return this.user_id;
    }

    get getTitle(): string {
        return this.title;
    }

    json() {
        return {
            user_id: this.user_id,
            title: this.title
        }
    }
}