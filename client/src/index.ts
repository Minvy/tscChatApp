import { io, Socket } from "socket.io-client";
import Message from "../../lib/Message"
import rl = require('readline')
import Log from "../../lib/Log";
import Request from "../../lib/Request";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const socket = io('http://localhost:3000');

socket.on("connect", async () => {
    let input: string
    const username: string = await readLine()
    while (input = await readLine()) {
        commandHandler(socket, username, input)
    }
    // socket.emit('request', new Request('chatLogUpdate', {}, new Date()))
});

function readLine(): Promise<string> {
    return new Promise(resolve => readline.question('', (input: string) => {
        readline.resume();
        rl.moveCursor(process.stdout, 0, -1)
        readline.pause();
        resolve(input);
    }))
}

function commandHandler(socket: Socket, username: string, input: string): void {
    const [command, argument]: string[] = input.split(' ')
    switch (command) {
        case '--create':
            socket.emit('request', new Request('create', { name: argument, username }, new Date()))
            break;
        case '--join':
            socket.emit('request', new Request('join', { name: argument, username }, new Date()))
            break;
        default:
            socket.emit('request', new Request('message', { text: input, username, date: new Date() }, new Date()))
    }
}

socket.on('chatUpdate', (update: Message) => {
    console.log(new Message(update.text, update.username, new Date(update.date)).read())
})

socket.on('chatLogUpdate', (chatLog: Log) => {
    chatLog.messages.forEach(message => console.log(new Message(message.text, message.username, new Date(message.date)).read()))
})

socket.on("disconnect", () => {
    console.log('disconnected');
});
