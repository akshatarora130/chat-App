import {atom} from "recoil";
import {ChatInterface} from "../interfaces/ChatInterface.tsx";

export const allChats = atom<Array<ChatInterface>>({
    key: "allChats",
    default: []
})