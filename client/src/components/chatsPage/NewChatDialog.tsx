import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Button, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";
import {backendURL} from "../../info/backendURL.tsx";
import {useRecoilState} from "recoil";
import {selectedUserNewChat} from "../../atoms/selectedUserNewChat.tsx";
import SearchUserNewChat from "./SearchUserNewChat.tsx";
import {allChats} from "../../atoms/chats.tsx";

interface NewChatDialogProps {
    open: boolean;
    onClose: () => void;
}

const NewChatDialog: React.FC<NewChatDialogProps> = ({ open, onClose }) => {
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserNewChat);
    const [chats, setChats] = useRecoilState(allChats);

    const searchUser = async (e: any) => {
        try {
            const response = await fetch(`${backendURL}user/searchedUsers?search=${e.target.value}`, {
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
            setSearchedUsers(data);
        } catch (error) {
            console.error("Error searching for users:", error);
        }
    }


    const createChat = async () => {
        try {
            const response = await fetch(`${backendURL}chat/createChat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ userId: selectedUser?._id }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (!chats.some(chat => chat._id === data._id)) {
                setChats([...chats, data]);
            }
        } catch (error) {
            console.error("Error creating a chat:", error);

        }

        onClose();
    }

    const handleClose = () => {
        setSearchedUsers([]);
        setSelectedUser(null);
        onClose();
    }


    return (
        <>
            <div >
                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle sx={{width: "500px"}}>NEW CHAT</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            placeholder="Search a chat"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                margin: "10px",
                                width: "93%",
                            }}
                            onChange={searchUser}
                        />
                        <div style={{
                            minHeight: "100px"
                        }}>
                            {searchedUsers.map((user) => {
                                return (
                                    <div>
                                        <SearchUserNewChat u={user}/>
                                    </div>
                                )
                            })}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={createChat} sx={{marginBottom: "20px", marginRight: "5px"}}>Create Chat</Button>
                        <Button variant= "contained" onClick={handleClose} sx={{marginBottom: "20px"}}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default NewChatDialog;
