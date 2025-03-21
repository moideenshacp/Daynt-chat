"use client";
import {
  Paper,
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  AvatarGroup,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { GroupMember } from "../../interface/Ichat";

interface ChatHeaderProps {
  groupMembers: GroupMember[];
  handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
}

const ChatHeader = ({
  groupMembers,
  handleMenuOpen,
  anchorEl,
  handleMenuClose,
}: ChatHeaderProps) => {
  return (
    <Paper
      sx={{
        p: 1.5,
        display: "flex",
        alignItems: "center",
        boxShadow: 0,
        borderRadius: 0,
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
      <Box sx={{ ml: 2, flex: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Project Team
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AvatarGroup
            max={3}
            sx={{
              "& .MuiAvatar-root": {
                width: 20,
                height: 20,
                fontSize: 10,
              },
            }}
          >
            {groupMembers.map((member) => (
              <Avatar
                key={member.id}
                sx={{
                  width: 20,
                  height: 20,
                  bgcolor: "#1976d2",
                }}
              >
                {member.avatar}
              </Avatar>
            ))}
          </AvatarGroup>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {groupMembers.length} online
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleMenuOpen} sx={{ marginLeft: "auto" }}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default ChatHeader;