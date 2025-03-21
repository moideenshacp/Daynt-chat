"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import ChatSidebar from "./ChatSidebar";
import ChatMain from "./ChatMain";
import { Message, GroupMember } from "../../interface/Ichat";

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey everyone! Welcome to our project group chat!",
      sender: "Alice",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isCurrentUser: false,
    },
  ]);
  const [file, setFile] = useState<File | null>(null);
  const [groupMembers] = useState<GroupMember[]>([
    {
      id: 1,
      name: "Alice",
      avatar: "A",
    },
    {
      id: 2,
      name: "Bob",
      avatar: "B",
    },
    {
      id: 3,
      name: "Charlie",
      avatar: "C",
    },
    {
      id: 4,
      name: "David",
      avatar: "D",
    },
  ]);
  const [showSidebar] = useState(true);

  const handleSendMessage = () => {
    if (message.trim() || file) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message.trim(),
        sender: "You",
        timestamp: new Date(),
        isCurrentUser: true,
        file: file,
      };

      setMessages([...messages, newMessage]);
      setMessage("");
      setFile(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <Box
      display="flex"
      height="100vh"
      bgcolor="#f0f2f5"
      sx={{ flexDirection: { xs: "column", md: "row" } }}
    >
      {showSidebar && (
        <ChatSidebar  />
      )}
      <ChatMain
        messages={messages}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        handleFileChange={handleFileChange}
        file={file}
        setFile={setFile}
        groupMembers={groupMembers}
      />
    </Box>
  );
};

export default ChatApp;