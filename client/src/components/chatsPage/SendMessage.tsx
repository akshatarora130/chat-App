import {Box, IconButton, TextField, useTheme} from "@mui/material";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import {useState} from "react";

const SendMessage = (props: any) => {
    const theme = useTheme();
    const [newMessage, setNewMessage] = useState("");

    const handleEmoji = () => {

    }

    const handleAdd = () => {

    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.handleSendMessage(newMessage);
            setNewMessage("");
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
                    onKeyDown={handleKeyPress}
                />
                <IconButton onClick={() => {
                    props.handleSendMessage(newMessage);
                    setNewMessage("");
                }} >
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