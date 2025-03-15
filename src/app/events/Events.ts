export enum SocketEvent {
    Message = 'message',
    JoinRoom = 'join-room',
    GetRooms = 'get-rooms',
    CreateRoom = 'create-room'
}

export const EventsCallbacks = {
    message: (message: string) => {
        console.log(`Message from server: ${message}`);
    },
    joinRoom: (room: string) => {
        console.log('Joined room:', room);
        return room;
    }
}
