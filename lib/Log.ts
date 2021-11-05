import Message from "./Message";

class Log {
    messages: Message[]
    constructor(){
        this.messages = []
    }
    getMessages(): Message[]{
        return this.messages
    }
    addMessage(message: Message): void{
        this.messages.push(message)
    }
}

export default Log