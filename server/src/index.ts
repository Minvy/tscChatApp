import { Server, Socket } from "socket.io";
import Message from '../../lib/Message'
import Log from "../../lib/Log";
import Request from "../../lib/Request";
import Room from "../../lib/Room";
import User from "../../lib/Client";

const chatLog: Log = new Log()
const io: Server = new Server();

// create a room, where people can join
// add password to room
// add support for commands eg --app create, --app password

const rooms: Room[] = []

io.on("connection", (socket: Socket) => {

  socket.on('request', (request: Request) => {
    const user = new User(request.payload.username, socket)

    switch(request.type){
      case 'message':
        handleMessage(user, request)
        break;
      case 'join':
        handleJoinRoom(user, request)
        break;
      case 'create':
        handleCreateNewRoom(request.payload.name)
        break;
      case 'password':
        handleAddPassword(request.payload.password)
        break;
    }
  })

  socket.on("requestChatLog", () => {
    socket.emit('chatLogUpdate', chatLog) 
  });
});

io.listen(3000);

function handleMessage(user: User, request: Request): void {
    if(user.room){
      const {text, username, date} = request.payload
      const message: Message = new Message(text, username, date)
      chatLog.addMessage(message)
      user.socket.to(user.room).emit('chatUpdate', message) 
    }
}

function handleAddPassword(request: Request): void {
  const room = rooms.find(room => {
    room.name == request.payload.name
  })
  if(room){
    room.password === request.payload.password
  }
}

function handleCreateNewRoom(roomName: string): void{
  if(rooms.find((room) => {
    return room.name == roomName
  })){
    return
  }
  rooms.push(new Room(roomName, undefined))
}

function handleJoinRoom(user: User, request: Request): void {
  const room = rooms.find(room => {
    room.name == request.payload.name
  })
  if(room){
    if(room.addUser(request.payload.username, request.payload.password)){
      user.enterRoom(request.payload.name)
      console.log(`${request.payload.username} has joined ${request.payload.name}`)
    }
  }
}
