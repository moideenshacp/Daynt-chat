import { Server } from "socket.io";
import Message from "../models/messageModel";

const connectedUsers: Record<string, { username: string; userId: string }> = {}; // Store connected users with IDs

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinChat", ({ userId, username }: { userId: string; username: string }) => {
      connectedUsers[socket.id] = { userId, username };
      console.log(username, userId);

      // Emit updated user list with both usernames and IDs
      io.emit("updateUsers", Object.values(connectedUsers));
    });

    socket.on("sendMessage", async (messageData) => {        
      const {  sender, text, file } = messageData;
      try {
        const message = await Message.create({ sender: sender, text, fileUrl:file });
        const populatedMessage = await Message.findById(message._id).populate("sender");
        console.log(populatedMessage,"populted");
        
        io.emit("receiveMessage", { ...message.toObject(), populatedMessage });
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      delete connectedUsers[socket.id];
      io.emit("updateUsers", Object.values(connectedUsers));
      console.log("User disconnected:", socket.id);
    });
  });
};
