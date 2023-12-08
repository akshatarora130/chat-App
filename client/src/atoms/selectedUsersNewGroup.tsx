import {atom} from "recoil";
import {UserInfoInterface} from "../interfaces/UserInfoInterface.tsx";

export const selectedUsersNewGroup = atom<Array<UserInfoInterface> | null>({
    key: "selectedUsersNewGroup",
    default: []
})