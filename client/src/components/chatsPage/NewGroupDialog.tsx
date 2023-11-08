import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Button, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface NewChatDialogProps {
    open: boolean;
    onClose: () => void;
}

const NewGroupDialog: React.FC<NewChatDialogProps> = ({ open, onClose }) => {

    const createGroup = () => {

        onClose();
    }

    return (
        <>
            <div >
                <Dialog open={open} onClose={onClose} >
                    <DialogTitle sx={{width: "1000px"}}>CREATE GROUP</DialogTitle>
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
                            // @ts-ignore
                            onChange={(e) => {}}
                        />
                        <div style={{
                            minHeight: "100px"
                        }}>

                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={createGroup} sx={{marginBottom: "20px", marginRight: "5px"}}>Create Group</Button>
                        <Button variant= "contained" onClick={onClose} sx={{marginBottom: "20px"}}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default NewGroupDialog;
