"use client";
import { Box, Typography, Avatar } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {  MessagesListProps } from "../../interface/Ichat";

const MessagesList = ({
  messages,
  messagesEndRef,
  messageContainerRef,
}: MessagesListProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <Box
      ref={messageContainerRef}
      sx={{
        p: 2,
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e5e5f7' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='24' cy='24' r='3'/%3E%3Ccircle cx='52' cy='52' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        bgcolor: "#efeae2",
      }}
    >
      {(() => {
        let lastDate: string | null = null;
        return messages.map((msg) => {
          const messageDate = formatDate(msg.timestamp);
          const showDateSeparator = messageDate !== lastDate;
          lastDate = messageDate;

          return (
            <Box key={msg.id} sx={{ width: "100%" }}>
              {showDateSeparator && (
                <Box sx={{ textAlign: "center", my: 2, position: "relative" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: "rgba(225, 245, 254, 0.92)",
                      px: 2,
                      py: 0.5,
                      borderRadius: 4,
                      boxShadow: "0 1px 0.5px rgba(0, 0, 0, 0.13)",
                      color: "rgba(0, 0, 0, 0.6)",
                      fontWeight: 500,
                    }}
                  >
                    {messageDate}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: msg.isCurrentUser
                    ? "flex-end"
                    : "flex-start",
                  mb: 1.5,
                  width: "100%",
                }}
              >
                {!msg.isCurrentUser && (
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      mr: 1,
                      mt: 0.5,
                      bgcolor: "#1976d2",
                    }}
                  >
                    {msg.sender.charAt(0)}
                  </Avatar>
                )}

                <Box
                  sx={{
                    bgcolor: msg.isCurrentUser ? "#dcf8c6" : "white",
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: "0 1px 0.5px rgba(0, 0, 0, 0.13)",
                    maxWidth: "70%",
                    textAlign: msg.isCurrentUser ? "right" : "left",
                  }}
                >
                  {!msg.isCurrentUser && (
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#ffc107",
                        fontSize: 14,
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      {msg.sender}
                    </Typography>
                  )}

                  <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                    {msg.text}
                  </Typography>

                  {msg.file && (
                    <Box
                      sx={{
                        mt: 1,
                        p: 1,
                        bgcolor: "rgba(0,0,0,0.06)",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AttachFileIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          flex: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {msg.file.name}
                      </Typography>
                    </Box>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      mt: 0.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: 11, mr: msg.isCurrentUser ? 0.5 : 0 }}
                    >
                      {formatTime(msg.timestamp)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        });
      })()}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessagesList;