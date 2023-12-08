import {Avatar, Button, useTheme} from "@mui/material";
import {useRecoilState} from "recoil";
import {selectedUsersNewGroup} from "../../atoms/selectedUsersNewGroup.tsx";

const SearchUserNewGroup = (props: any) => {
    const theme = useTheme();
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUsersNewGroup);
    const user = props.u;
    const same = selectedUser?.includes(user)

    const handleAddUser = () => {
        if(!selectedUser?.includes(user)){
            // @ts-ignore
            setSelectedUser([...selectedUser, user])
        }
        else{
            setSelectedUser(selectedUser.filter(selected => selected !== user));
        }
    }

    return (
        <>
            <Button sx={{
                width: "93.5%",
                height: "60px",
                // @ts-ignore
                backgroundColor: same ? theme.palette.customColors.selectedBgUserNewChat : theme.palette.customColors.backgroundUserNewChat,
                // @ts-ignore
                color: theme.palette.customColors.colorNewChat,
                marginLeft: "9px"
            }}
                    onClick={handleAddUser}
            >
                <div style={{
                    display: "flex",
                    gap: "50px"
                }}>
                    <Avatar alt={user?.name} src={user?.profilePic} sx={{
                        marginTop: "5px"
                    }}/>
                    <div style={{
                        marginRight: "120px"
                    }}>
                        <div>{user.name}</div>
                        <div>{(user.email)}</div>
                    </div>
                </div>
            </Button>
        </>
    )
}

export default SearchUserNewGroup;