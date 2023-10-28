import {atom} from "recoil";
import {MessageInterface} from "../interfaces/messageInterface.tsx";

export const messages = atom<Array<MessageInterface>>({
    key: "messages",
    default: []
})