import { Socket } from "socket.io"

class User {
    username: string
    socket: Socket
    room?: string

    constructor(username: string, socket: Socket) {
        this.username = username
        this.socket = socket
    }

    enterRoom(name: string) {
       this.socket.join(name)
    }
}
export default User