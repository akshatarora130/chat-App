import {atom} from "recoil";
import {UserInfoInterface} from "../interfaces/UserInfoInterface.tsx";

export const selectedUserNewChat = atom<UserInfoInterface | null>({
    key: "selectedUserNewChat",
    default: null
})