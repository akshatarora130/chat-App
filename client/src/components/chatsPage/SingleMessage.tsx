import { useTheme} from "@mui/material";
import {useRecoilValue} from "recoil";
import {loggedInUser} from "../../atoms/loggedInUser.tsx";

const SingleMessage = (props : any) => {
    const theme = useTheme();
    const m = props.mess;
    const userInfo = useRecoilValue(loggedInUser);

    return(
        <>
            <div style={{
                    display: "flex",
                    justifyContent: m.sender._id === userInfo?._id ? "flex-end" : "flex-start"
                }}
                 key={m._id}>
                <span style={{
                    // @ts-ignore
                    backgroundColor: `${m.sender._id === userInfo?._id ? theme.palette.customColors.senderMessage : theme.palette.customColors.receiverMessage}`,
                    // @ts-ignore
                    color: theme.palette.customColors.messageText,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                    marginTop: "3px",
                    alignSelf: m.sender._id === userInfo?._id ? "flex-end" : "flex-start",
                    marginRight: "10px",
                    marginLeft: "10px"
                }}>
                    {m.content}
                </span>
            </div>
        </>
    )
}

export default SingleMessage;