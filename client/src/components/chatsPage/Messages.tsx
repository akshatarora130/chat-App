import { useRecoilValue} from "recoil";
import {messages} from "../../atoms/messages.tsx";
import SingleMessage from "./SingleMessage.tsx";

const Messages = () => {
    const allMessages = useRecoilValue(messages);

    return(
        <>
            <div style={{
                width: "100%",
                height: "695px",
                overflow: "scroll",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
            }}>
                {allMessages.map((m) => {
                    return (
                        <div>
                            <SingleMessage mess = {m}/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Messages;