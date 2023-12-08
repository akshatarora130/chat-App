import {Box, IconButton, useTheme} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {useRecoilState} from "recoil";
import {selectedUsersNewGroup} from "../../atoms/selectedUsersNewGroup.tsx";

const SelectedUserNewGroup = (props: any) => {
    const user = props.u;
    const theme = useTheme();
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUsersNewGroup);

    const handleRemove = () => {
        // @ts-ignore
        setSelectedUser(selectedUser.filter(selected => selected !== user));
    }

    return(
        <>
            <Box sx = {{
                marginLeft: "8px",
                marginBottom: "8px",
                // @ts-ignore
                backgroundColor: theme.palette.customColors.selectedUserBg,
                borderRadius: "10px",
                display: "flex",
                gap: "10px"
            }}>
                <div style={{
                    marginTop: "7px",
                    marginLeft: "5px"
                }}>
                    {user.name}
                </div>
                <IconButton size={"small"} sx={{marginLeft: "-7px"}} onClick={handleRemove}>
                    <ClearIcon />
                </IconButton>
            </Box>
        </>
    )
}

export default SelectedUserNewGroup;