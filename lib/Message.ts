class Message {
    text: string
    username: string
    date: Date
    constructor(text:string, username:string, date: Date){
        this.text = text
        this.username = username
        this.date = date
    }
    read(): string {
        return `[${this.date.toTimeString().slice(0,8)} - ${this.username}]: ${this.text}`
    }
}
export default Message