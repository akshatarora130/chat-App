import {Avatar, Button, useTheme} from "@mui/material";
import {useRecoilState} from "recoil";
import {selectedUserNewChat} from "../../atoms/selectedUserNewChat.tsx";

const SearchUserNewChat = (props: any) => {
    const theme = useTheme();
    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserNewChat);
    const user = props.u;
    const same = selectedUser === user

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
                onClick={() => setSelectedUser(user)}
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

export default SearchUserNewChat;