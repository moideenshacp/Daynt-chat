"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import ChatSidebar from "./ChatSidebar";
import ChatMain from "./ChatMain";

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showSidebar] = useState(true);


//handling input file change
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
  
    if (selectedFile) {
      setFile(selectedFile); 
    }
  };
  

  return (
    <Box
      display="flex"
      height="100vh"
      bgcolor="#f0f2f5"
      sx={{ flexDirection: { xs: "column", md: "row" } }}
    >
      {showSidebar && <ChatSidebar />}
      <ChatMain
        message={message}
        setMessage={setMessage}
        handleFileChange={handleFileChange}
        file={file}
        setFile={setFile}
      />
    </Box>
  );
};

export default ChatApp;
