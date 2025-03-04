export const Events = {
    message: 'message',
    connect: 'connect',
    disconnect: 'disconnect',
    joinRoom: 'join-room',
};

export const EventsCallbacks = {
    message: (message: string) => {
        console.log(`Message from server: ${message}`);
    },
    joinRoom: (room: string) => {
        console.log('Joined room:', room);
        return room;
    }
}
