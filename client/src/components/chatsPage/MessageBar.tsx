import { Avatar, Box, IconButton, Typography, useTheme, Popover, Paper, List, ListItem, ListItemText } from "@mui/material";
import {useRecoilState, useRecoilValue} from "recoil";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import {selectedChatInfo} from "../../atoms/selectedChatInfo.tsx";
import {loggedInUser} from "../../atoms/loggedInUser.tsx";
import {UserInfoInterface} from "../../interfaces/UserInfoInterface.tsx";

const MessageBar = () => {
    const theme = useTheme();
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatInfo);
    const userInfo = useRecoilValue(loggedInUser);
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

    const getSender = (loggedUser: UserInfoInterface | null, users: Array<UserInfoInterface> | undefined): UserInfoInterface | null => {
        if(loggedUser === null || users === undefined){
            return null;
        }
        return users[0]?._id === loggedUser?._id ? users[1] : users[0];
    };

    const handleBack = () => {
        setSelectedChat(null)
    }

    const handleProfileBoxOpen = () => {

    };

    const handleCall = () => {

    };

    const handleVideoCall = () => {

    };

    const handleSearch = () => {

    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleClearChat = () => {
        handleMenuClose();
    }

    const handleDeleteChat = () => {
        handleMenuClose();
    }

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
                <IconButton onClick={handleBack}>
                    <ArrowBackIcon/>
                </IconButton>
                <IconButton onClick={handleProfileBoxOpen}>
                    <Avatar alt="" src="" />
                </IconButton>

                <Typography
                    variant="h6"
                    sx={{
                        marginLeft: "8px",
                        // @ts-ignore
                        color: theme.palette.customColors.nameColor
                    }}
                >
                    {selectedChat?.isGroupChat ? selectedChat?.chatName : getSender(userInfo, selectedChat?.users)?.name}
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleCall}>
                    <PhoneIcon/>
                </IconButton>
                <IconButton onClick={handleVideoCall}>
                    <VideocamIcon />
                </IconButton>
                <IconButton onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
                <IconButton onClick={handleMenuOpen}>
                    <ExpandMoreIcon />
                </IconButton>
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
                        <ListItem button sx={{ width: "150px" }} onClick={handleProfileBoxOpen}>
                            <ListItemText primary="Chat Info" />
                        </ListItem>
                        <ListItem button onClick={handleClearChat}>
                            <ListItemText primary="Clear chat" />
                        </ListItem>
                        <ListItem button onClick={handleDeleteChat}>
                            <ListItemText primary="Delete chat" />
                        </ListItem>
                    </List>
                </Paper>
            </Popover>
        </Box>
    );
};

export default MessageBar;