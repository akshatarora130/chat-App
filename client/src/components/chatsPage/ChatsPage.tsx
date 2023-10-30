import {Box, useTheme} from "@mui/material";
import lightModeMessageBg from "../../Assets/Images/lightModeMessagebg.png";
import darkModeMessageBg from "../../Assets/Images/darkModeMessageBg.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { themesState } from "../../atoms/themeState.tsx";
import ChatsBar from "./ChatsBar.tsx";
import MessageBar from "./MessageBar.tsx";
import Hidden from "@mui/material/Hidden";
import {selectedChatInfo} from "../../atoms/selectedChatInfo.tsx";
import { allChats } from "../../atoms/chats.tsx";
import { useEffect } from "react";
import { backendURL } from "../../info/backendURL.tsx";
import axios from "axios";
import SearchBar from "./SearchBar.tsx";
import SingleChat from "./SingleChat.tsx";
import {loggedInUser} from "../../atoms/loggedInUser.tsx";
import Messages from "./Messages.tsx";
import SendMessage from "./SendMessage.tsx";
import {messages} from "../../atoms/messages.tsx";

const ChatsPage = () => {
    const theme = useTheme();
    const themeState = useRecoilValue(themesState);
    const [userInfo, setUserInfo] = useRecoilState(loggedInUser);
    const [chats, setChats] = useRecoilState(allChats);
    // @ts-ignore
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatInfo);
    // @ts-ignore
    const [allMessages, setAllMessages] = useRecoilState(messages);

    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`${backendURL}user/userInfo`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUserInfo(data);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }


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

    const fetchMessages = async () => {
        if (!selectedChat) {
            return;
        }

        try {
            const response = await fetch(`${backendURL}message/fetchMessages/${selectedChat._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAllMessages(data);
            } else {
                console.error("Failed to fetch messages:", response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while fetching messages:", error);
        }
    }


    useEffect(() => {
        fetchUserInfo();
        fetchChats();
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);

    return (
        <>
            {!userInfo ? (
                <div>

                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        height: "100vh",
                    }}
                >
                    <Hidden mdDown={!!selectedChat}>
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
                            {chats.length !== 0 ? (
                                chats.map((c) => {
                                    return <SingleChat c = {c} />
                                })
                            ): (
                                <div></div>
                            )}
                        </Box>
                    </Hidden>
                    <Hidden mdDown={!selectedChat}>
                        <Box
                            sx={{
                                flex: 3,
                                // @ts-ignore
                                backgroundColor: theme.palette.customColors.messageBoxBackground,
                                backgroundImage: `url(${themeState === "light" ? lightModeMessageBg : darkModeMessageBg})`,
                                backgroundSize: "cover",
                            }}
                        >
                            {selectedChat && <MessageBar />}
                            {selectedChat && <Messages />}
                            {selectedChat && <SendMessage/>}
                        </Box>
                    </Hidden>
                </div>
            )}
        </>
    );
};

export default ChatsPage;
