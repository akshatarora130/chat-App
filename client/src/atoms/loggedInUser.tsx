import {atom} from "recoil";
import {UserInfoInterface} from "../interfaces/UserInfoInterface.tsx";

export const loggedInUser = atom<UserInfoInterface | null>({
    key: "loggedInUser",
    default: null
})