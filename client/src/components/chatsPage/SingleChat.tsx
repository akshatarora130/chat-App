import {ChatInterface} from "../../interfaces/ChatInterface.tsx";

interface propsType {
    c: ChatInterface
}

const SingleChat = (props : propsType) => {
    // @ts-ignore
    const c = props.c;
    return(
        <>

        </>
    )
}

export default SingleChat;