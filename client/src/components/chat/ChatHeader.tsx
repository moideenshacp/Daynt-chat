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
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/userSlice";
import { useSocket } from "@/context/SocketContext";
import LogoutIcon from "@mui/icons-material/Logout";


interface ChatHeaderProps {
  handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
}

const ChatHeader = ({
  handleMenuOpen,
  anchorEl,
  handleMenuClose,
}: ChatHeaderProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { connectedUsers } = useSocket();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/signin");
  };
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
            {connectedUsers.map((member) => (
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
            {connectedUsers.length} online
          </Typography>
        </Box>
      </Box>
      <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  }}
>
  <IconButton 
    onClick={handleMenuOpen} 
    sx={{
      bgcolor: "#f0f2f5",
      "&:hover": { bgcolor: "#e0e0e0" },
      transition: "all 0.3s ease-in-out",
    }}
  >
    <MoreVertIcon sx={{ color: "#555" }} />
  </IconButton>

  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleMenuClose}
    sx={{
      mt: 1,
      "& .MuiPaper-root": {
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        minWidth: 150,
        backgroundColor: "#fff",
      },
    }}
  >
    <MenuItem 
      onClick={handleLogout}
      sx={{
        color: "#d32f2f",
        fontWeight: "bold",
        "&:hover": { 
          bgcolor: "#ffebee", 
          color: "#b71c1c",
        },
        transition: "all 0.2s ease-in-out",
      }}
    >
      <LogoutIcon sx={{ mr: 1, color: "#d32f2f" }} />
      Logout
    </MenuItem>
  </Menu>
</Box>

    </Paper>
  );
};

export default ChatHeader;
