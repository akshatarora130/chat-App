import { Avatar, Box, IconButton, useTheme, Paper, List, ListItem, ListItemText, Popover } from "@mui/material";
import { useRecoilState } from "recoil";
import { themesState } from "../../atoms/themeState.tsx";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { loggedInUser } from "../../atoms/loggedInUser.tsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import NewChatDialog from "./NewChatDialog.tsx";
import NewGroupDialog from "./NewGroupDialog.tsx";

const ChatsBar = () => {
    const theme = useTheme();
    const [themeState, setThemeState] = useRecoilState(themesState);
    // @ts-ignore
    const [userInfo, setUserInfo] = useRecoilState(loggedInUser);
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
    const [isChatDialogOpen, setChatDialogOpen] = useState(false);
    const [isGroupDialogOpen, setGroupDialogOpen] = useState(false);
    const navigate = useNavigate();

    const toggleTheme = () => {
        setThemeState(themeState === "light" ? "dark" : "light");
    };

    const handleProfileBoxOpen = () => {

    };

    const handleNewChat = () => {
        setChatDialogOpen(true);
    };

    const handleNewGroup = () => {
        setGroupDialogOpen(true);
    };

    const closeChatDialog = () => {
        setChatDialogOpen(false);
    };

    const closeGroupDialog = () => {
        setGroupDialogOpen(false);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleSettings = () => {

        handleMenuClose();
    };

    const handleLogout = () => {
        localStorage.clear();
        handleMenuClose();
        navigate("/")
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // @ts-ignore
                backgroundColor: theme.palette.customColors.chatsBar,
                padding: "8px 16px",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleProfileBoxOpen}>
                    <Avatar alt={userInfo?.name} src={userInfo?.profilePic} />
                </IconButton>
            </Box>
            <Box sx={{display: "flex"}}>
                <IconButton onClick={handleNewChat}>
                    <ChatIcon />
                </IconButton>
                <IconButton onClick={handleNewGroup}>
                    <GroupsIcon />
                </IconButton>
                <IconButton onClick={toggleTheme}>
                    {themeState === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
                <IconButton onClick={handleMenuOpen}>
                    <ExpandMoreIcon />
                </IconButton>

                <NewChatDialog open={isChatDialogOpen} onClose={closeChatDialog}  />
                <NewGroupDialog open={isGroupDialogOpen} onClose={closeGroupDialog}  />
            </Box>
            <Popover
                open={Boolean(menuAnchorEl)}
                anchorEl={menuAnchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Paper>
                    <List>
                        <ListItem button onClick={handleSettings}>
                            <ListItemText primary="Settings" sx={{width: "150px"}}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Logout" onClick={handleLogout} />
                        </ListItem>
                    </List>
                </Paper>
            </Popover>
        </Box>
    );
};

export default ChatsBar;
