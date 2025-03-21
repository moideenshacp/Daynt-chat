"use client";
import { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import {  ChatMainProps } from "../../interface/Ichat";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessageList";

const ChatMain = ({
  messages,
  message,
  setMessage,
  handleSendMessage,
  handleFileChange,
  file,
  setFile,
  groupMembers,
}: ChatMainProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box flex={1} display="flex" flexDirection="column">
      {/* Chat header */}
      <ChatHeader 
        groupMembers={groupMembers} 
        handleMenuOpen={handleMenuOpen} 
        anchorEl={anchorEl} 
        handleMenuClose={handleMenuClose} 
      />

      {/* Messages area */}
      <MessagesList 
        messages={messages} 
        messagesEndRef={messagesEndRef} 
        messageContainerRef={messageContainerRef} 
      />

      {/* Input Section */}
      <Paper
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          borderRadius: 0,
          bgcolor: "#f0f2f5",
        }}
      >
        <IconButton component="label">
          <AttachFileIcon />
          <input type="file" hidden onChange={handleFileChange} />
        </IconButton>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant="outlined"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            mx: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
              bgcolor: "white",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
                borderWidth: 0,
              },
            },
          }}
        />
        {file && (
          <Box
            sx={{
              position: "absolute",
              bottom: 70,
              left: 20,
              right: 20,
              bgcolor: "white",
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <AttachFileIcon sx={{ mr: 1 }} />
            <Typography variant="body2" sx={{ flex: 1 }}>
              {file.name}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setFile(null)}
              sx={{ ml: 1 }}
            >
              ✕
            </IconButton>
          </Box>
        )}
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          sx={{
            bgcolor: "#25D366",
            color: "white",
            "&:hover": { bgcolor: "#128C7E" },
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ChatMain;