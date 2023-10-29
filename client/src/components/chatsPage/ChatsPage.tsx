import {Box, useTheme} from "@mui/material";
import lightModeMessageBg from "../../Assets/Images/lightModeMessagebg.png";
import darkModeMessageBg from "../../Assets/Images/darkModeMessageBg.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { themesState } from "../../atoms/themeState.tsx";
import ChatsBar from "./ChatsBar.tsx";
import MessageBar from "./MessageBar.tsx";
import Hidden from "@mui/material/Hidden";
import { selectedUserInfo } from "../../atoms/selectedUserInfo.tsx";
import { allChats } from "../../atoms/chats.tsx";
import { useEffect } from "react";
import { backendURL } from "../../info/backendURL.tsx";
import axios from "axios";
import SearchBar from "./SearchBar.tsx";
import SingleChat from "./SingleChat.tsx";

const ChatsPage = () => {
    const theme = useTheme();
    const themeState = useRecoilValue(themesState);
    const [chats, setChats] = useRecoilState(allChats);
    const selectedUser = useRecoilValue(selectedUserInfo);

    const fetchChats = async () => {
        try {
            const response = await axios.get(`${backendURL}chat/fetchChats`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = response.data;
            setChats(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
            }}
        >
            <Hidden mdDown={!!selectedUser}>
                <Box
                    sx={{
                        flex: 1,
                        // @ts-ignore
                        backgroundColor: theme.palette.customColors.chatsBoxBackground,
                        borderRight: "2px solid",
                        // @ts-ignore
                        borderColor: theme.palette.customColors.chatBorder,
                    }}
                >
                    <ChatsBar />
                    <SearchBar />
                    {chats.length === 0 ? (
                        chats.map((c) => {
                            return <SingleChat c = {c} />
                        })
                    ): (
                        <div></div>
                    )}
                </Box>
            </Hidden>
            <Hidden mdDown={!selectedUser}>
                <Box
                    sx={{
                        flex: 3,
                        // @ts-ignore
                        backgroundColor: theme.palette.customColors.messageBoxBackground,
                        backgroundImage: `url(${themeState === "light" ? lightModeMessageBg : darkModeMessageBg})`,
                        backgroundSize: "cover",
                    }}
                >
                    {!selectedUser && <MessageBar />}
                </Box>
            </Hidden>
        </div>
    );
};

export default ChatsPage;
