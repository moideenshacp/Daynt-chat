/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { GroupMember, Message } from "../interface/Ichat";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchMessages, uploadFile } from "@/lib/api/chatApi";

interface SocketContextProps {
  socket: Socket | null;
  messages: Message[];
  sendMessage: (message: string,file?: File | null) => void;
  connectedUsers: GroupMember[];
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<GroupMember[]>([]);
  const { user } = useSelector((state: RootState) => state.user);


  //socker set-up
  useEffect(() => {
    if (!user) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_BASE_URL);
    setSocket(newSocket);

    // Emit joinChat event
    newSocket.emit("joinChat", { username: user.name, userId: user.id });

    newSocket.on("receiveMessage", (message: any) => {
      const formattedMessage = {
        id: message.populatedMessage._id,
        sender: message.populatedMessage.sender.name,
        text: message.populatedMessage.text,
        file: message.populatedMessage.fileUrl || null,
        timestamp: new Date(message.populatedMessage.createdAt),
        isCurrentUser: message.populatedMessage.sender._id === user.id,
      };
      setMessages((prevMessages) => [...prevMessages, formattedMessage]);
    });

    newSocket.on(
      "updateUsers",
      (userList: { userId: string; username: string }[]) => {
        const updatedUsers = userList
          .map((users) => ({
            id: users.userId,
            name: users.userId === user.id ? "You" : users.username,
            avatar: users.username[0].toUpperCase(),
          }))
          .sort((a, b) => (a.id === user.id ? -1 : b.id === user.id ? 1 : 0));

        setConnectedUsers(updatedUsers);
      }
    );

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // Fetch previous messages
  useEffect(() => {
    if (!user) return;

    const getMessages = async () => {
      try {
        const res = await fetchMessages();
        const formattedMessages = res.data.map((msg: any) => ({
          id: msg._id,
          sender: msg.sender.name,
          text: msg.text,
          file: msg.fileUrl || null,
          timestamp: new Date(msg.createdAt),
          isCurrentUser: msg.sender._id === user.id,
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [user]);


  //send message
  const sendMessage = async (text: string, file?: File | null) => {
    if (!socket) return;
  
    let fileUrl: string | null = null;
  
    if (file) {
      try {
        fileUrl = await uploadFile(file); 
      } catch (error) {
        console.error("File upload failed:", error);
        return;
      }
    }
  
    const message: Message = {
      id: messages.length + 1,
      text,
      sender: user?.id,
      file: fileUrl,
      timestamp: new Date(),
    };
  
    socket.emit("sendMessage", message); 
  };
  

  

  return (
    <SocketContext.Provider
      value={{ socket, messages, connectedUsers, sendMessage }}
    >
      {children}
    </SocketContext.Provider>
  );
};
