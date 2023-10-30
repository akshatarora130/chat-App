import {Box, IconButton, TextField, useTheme} from "@mui/material";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import {useState} from "react";
import {backendURL} from "../../info/backendURL.tsx";
import {useRecoilState, useRecoilValue} from "recoil";
import {selectedChatInfo} from "../../atoms/selectedChatInfo.tsx";
import {messages} from "../../atoms/messages.tsx";

const SendMessage = () => {
    const theme = useTheme();
    const selectedChat = useRecoilValue(selectedChatInfo);
    const [allMessages, setAllMessages] = useRecoilState(messages)
    const [newMessage, setNewMessage] = useState("");

    const handleEmoji = () => {

    }

    const handleAdd = () => {

    }

    const handleSendMessage = async () => {
        try {
            const response = await fetch(`${backendURL}message/sendMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ content: newMessage, chatId: selectedChat?._id })
            });

            if (response.ok) {
                const data = await response.json();
                setAllMessages([...allMessages, data]);
                setNewMessage("");
            } else {
                console.error("Failed to send message:", response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while sending the message:", error);
        }
    }

    return(
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    // @ts-ignore
                    backgroundColor: theme.palette.customColors.chatsBar,
                    padding: "8px 16px",
                    height: "40px",
                    marginTop: "10px"
                }}
            >
                <IconButton onClick={handleEmoji}>
                    <EmojiEmotionsIcon style={{
                        // @ts-ignore
                        color: theme.palette.customColors.emojiIcon,
                    }}/>
                </IconButton>
                <IconButton onClick={handleAdd}>
                    <AddIcon style={{
                        // @ts-ignore
                        color: theme.palette.customColors.addIcon,
                    }}/>
                </IconButton>
                <TextField
                    variant="outlined"
                    placeholder="Type a Message"
                    size="small"
                    value={newMessage}
                    sx={{
                        margin: "10px",
                        width: "88%",
                    }}
                    // @ts-ignore
                    onChange={(e) => {
                        setNewMessage(e.target.value);
                    }}
                />
                <IconButton onClick={handleSendMessage}>
                    <SendIcon style={{
                        // @ts-ignore
                        color: theme.palette.customColors.sendIcon,
                    }}/>
                </IconButton>
            </Box>
        </>
    )
}

export default SendMessage;