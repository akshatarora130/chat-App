import {atom} from "recoil";
import {UserInfoInterface} from "../interfaces/UserInfoInterface.tsx";

export const selectedUserInfo = atom<UserInfoInterface | null>({
    key: "selectedUserInfo",
    default: null
})