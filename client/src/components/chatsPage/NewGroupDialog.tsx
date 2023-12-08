import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Button, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Groups2SharpIcon from '@mui/icons-material/Groups2Sharp';
import {useState} from "react";
import {useRecoilState} from "recoil";
import {selectedUsersNewGroup} from "../../atoms/selectedUsersNewGroup.tsx";
import {allChats} from "../../atoms/chats.tsx";
import {backendURL} from "../../info/backendURL.tsx";
import SelectedUserNewGroup from "./SelectedUserNewGroup.tsx";
import SearchUserNewGroup from "./SearchUsersNewGroup.tsx";

interface NewChatDialogProps {
    open: boolean;
    onClose: () => void;
}

const NewGroupDialog: React.FC<NewChatDialogProps> = ({ open, onClose }) => {
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUsersNewGroup);
    const [chats, setChats] = useRecoilState(allChats);
    const [groupName, setGroupName] = useState("");

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

    const createGroup = async () => {
        try{
            const response = await fetch(`${backendURL}chat/createGroup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ name: groupName, users: selectedUsers }),
            })

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setChats([...chats, data]);
        }
        catch (error){
            console.error("Error while creating group: ", error)
        }
        handleClose();
    }

    const handleClose = () => {
        setSelectedUsers([]);
        setSearchedUsers([]);
        onClose();
    }

    return (
        <>
            <div >
                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle sx={{width: "500px"}}>CREATE GROUP</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            placeholder="Group Name"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Groups2SharpIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                margin: "10px",
                                width: "93%",
                            }}
                            onChange={(e) => {
                                setGroupName(e.target.value);
                            }}
                        />
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
                            // @ts-ignore
                            onChange={(e) => {
                                searchUser(e);
                            }}
                        />
                        <div style={{display: "flex"}}>
                            {selectedUsers && selectedUsers.map((user) => {
                                return (
                                    <div >
                                        <SelectedUserNewGroup u={user}/>
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{
                            minHeight: "100px"
                        }}>
                            {searchedUsers.map((user) => {
                                return (
                                    <div>
                                        <SearchUserNewGroup u={user}/>
                                    </div>
                                )
                            })}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={createGroup} sx={{marginBottom: "20px", marginRight: "5px"}}>Create Group</Button>
                        <Button variant= "contained" onClick={handleClose} sx={{marginBottom: "20px"}}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default NewGroupDialog;
