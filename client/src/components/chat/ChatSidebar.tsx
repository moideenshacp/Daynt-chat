"use client";
import {
  Paper,
  Box,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  Badge,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useSocket } from "@/context/SocketContext";

const ChatSidebar = () => {
  const { connectedUsers } = useSocket();

  return (
    <Paper
      sx={{
        width: { xs: "100%", md: 320 },
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        boxShadow: { xs: 0, md: 3 },
      }}
    >
      {/* Group info header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          bgcolor: "#f0f2f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#25D366",
            color: "white",
            height: 40,
            width: 40,
          }}
        >
          <GroupIcon />
        </Avatar>
        <Box sx={{ flex: 1, ml: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Project Team
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ px: 2, py: 1.5 }}
      >
        ACTIVE MEMBERS - {connectedUsers.length}
      </Typography>

      <List sx={{ overflow: "auto", flex: 1, pt: 0 }}>
        {connectedUsers.map((member) => (
          <ListItem
            key={member.id}
            sx={{
              cursor: "pointer",
              "&:hover": { bgcolor: "#f5f5f5" },
              borderBottom: "1px solid #f5f5f5",
              px: 2,
              py: 1,
            }}
            disablePadding
          >
            <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#1976d2",
                  }}
                >
                  {member.avatar}
                </Avatar>
              </Badge>
              <Box sx={{ ml: 2, flex: 1, overflow: "hidden" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {member.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ChatSidebar;
