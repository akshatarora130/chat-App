import {UserInfoInterface} from "./UserInfoInterface.tsx";

export interface ChatInterface {
    _id: string,
    chatName: string,
    isGroupChat: boolean,
    users: Array<UserInfoInterface>,
    latest: Array<{
        _id: string,
        sender: UserInfoInterface,
        content: string,
        chat: string,
        createdAt: string,
        updatedAt: string,
        __v: number,
    }>,
    groupAdmin: Array<UserInfoInterface>,
    createdAt: string,
    updatedAt: string,
    __v: number
}