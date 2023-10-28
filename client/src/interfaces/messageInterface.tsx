import {UserInfoInterface} from "./UserInfoInterface.tsx";
import {ChatInterface} from "./ChatInterface.tsx";

export interface MessageInterface {
    _id: string,
    sender: UserInfoInterface,
    content: string,
    chat: ChatInterface,
    createdAt: string,
    updatedAt: string,
    __v: number
}