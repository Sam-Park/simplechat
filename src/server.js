const server = require("http").createServer()
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';

io.on("connection", (socket) => {

    //joining conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // listen for new msg
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    // Leave the room if user closes socket
    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
})

server.listen(PORT, () => {
    console.log(`Ears are on for port ${PORT}`)
});