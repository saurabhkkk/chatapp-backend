const { encryptMessage, decryptMessage } = require("../utils/encryptionUtils");

const sendMessage = (io, socket, data) => {
  console.log("Received message inside chat controllers:", data);
  const { roomId, message } = data;
  if (!roomId) {
    console.log("No roomId provided in the message data");
    return;
  }
  const encryptedMessage = encryptMessage(message);
  io.to(roomId).emit("message", {
    username: socket.user.username,
    message: encryptedMessage,
  });
};

const sendImage = (io, socket, data) => {
  const { roomId, image } = data;
  if (!roomId) {
    console.log("No roomId provided in the image data");
    return;
  }
  io.to(roomId).emit("image", {
    username: socket.user.username,
    image: image,
  });
};

module.exports = { sendMessage, sendImage };
