import {atom} from "recoil";
import {ChatInterface} from "../interfaces/ChatInterface.tsx";

export const selectedChatInfo = atom<ChatInterface | null>({
    key: "selectedChatInfo",
    default: null
})