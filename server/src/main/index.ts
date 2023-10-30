import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {port} from "../info/port"
import {mongooseUrl} from "../info/mongooseConnect";
import userLogin from "../routes/user/loginRoute";
import userSignup from "../routes/user/signupRoute"
import searchedUsers from "../routes/user/searchedUsers";
import createChat from "../routes/chats/createChat";
import fetchChats from "../routes/chats/fetchChats";
import sendMessage from "../routes/messages/sendMessage";
import fetchMessages from "../routes/messages/fetchMessages";
import createGroup from "../routes/chats/createGroup";
import renameGroup from "../routes/chats/renameGroup";
import groupAdd from "../routes/chats/groupAdd";
import groupRemove from "../routes/chats/groupRemove";
import loggedInUserInfo from "../routes/user/loggedInUserInfo";


mongoose.connect(mongooseUrl, {dbName: "chatApp"}).then(() => {
    console.log("mondoDB connected");
})

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userSignup);              //       /user/signup
app.use("/user", userLogin);               //       /user/login
app.use("/user", searchedUsers);           //       /user/searchedUsers
app.use("/user", loggedInUserInfo)         //       /user/userInfo

app.use("/chat", createChat);              //       /chat/createChat
app.use("/chat", fetchChats);              //       /chat/fetchChats
app.use("/chat", createGroup)              //       /chat/createGroup
app.use("/chat", renameGroup)              //       /chat/renameGroup
app.use("chat", groupAdd)                  //       /chat/groupAdd
app.use("/chat", groupRemove)              //       /chat/groupRemove

app.use("/message", sendMessage)           //       /message/sendMessage
app.use("/message", fetchMessages)         //       /message/fetchMessages/:chatId

app.listen(port, () => {
    console.log(`app running on port number ${port}`);
})