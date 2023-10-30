import {ChatInterface} from "../../interfaces/ChatInterface.tsx";
import {Avatar, Button, Typography, useTheme} from "@mui/material";
import {useRecoilState, useRecoilValue} from "recoil";
import {selectedChatInfo} from "../../atoms/selectedChatInfo.tsx";
import {loggedInUser} from "../../atoms/loggedInUser.tsx";
import {UserInfoInterface} from "../../interfaces/UserInfoInterface.tsx";

interface propsType {
    c: ChatInterface
}

const SingleChat = (props : propsType) => {
    const c = props.c;
    const userInfo = useRecoilValue(loggedInUser);
    // @ts-ignore
    const [selectedChat, setSelectedChat] = useRecoilState(selectedChatInfo)
    const theme = useTheme();

    const getSender = (loggedUser: UserInfoInterface | null, users: Array<UserInfoInterface> | undefined): UserInfoInterface | null => {
        if(loggedUser === null || users === undefined){
            return null;
        }
        return users[0]?._id === loggedUser?._id ? users[1] : users[0];
    };

    return(
        <>
            <Button sx={{
                width: "100%",
                // @ts-ignore
                color: theme.palette.customColors.chatsColor,
                display: "flex",
                justifyContent: "flex-start"
            }}
                onClick={() => {
                    setSelectedChat(c)
                }}
            >
                <div style={{
                    display: "flex",
                    gap: "20px",
                }}>
                    <Avatar alt={c.chatName} src={getSender(userInfo, c.users)?.profilePic} sx={{
                        marginTop: "10px"
                    }}/>
                    <div style={{
                        flex: "1",
                    }}>
                        <div>
                            <Typography style={{
                                marginTop: "5px",
                                marginLeft: "0px"
                            }}>
                                {c.isGroupChat ? c.chatName : getSender(userInfo, c?.users)?.name}
                            </Typography>
                        </div>
                        <div>
                            {c.latest.length !== 0 ? (
                                <div>
                                    {/*{c.latest[0].content}*/}
                                </div>
                            ) : (
                                <div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Button>
            <hr style={{
                marginTop: "10px",
                marginLeft: "60px",
            }}/>
        </>
    )
}

export default SingleChat;