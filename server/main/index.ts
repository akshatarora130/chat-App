import express from "express";
import cors from "cors";

import {port} from "../info/port"
import {User} from "../databaseModels/userModel"
import {Chat} from "../databaseModels/chatModel"
import {Message} from "../databaseModels/messageModel";
import mongoose from "mongoose";
import {mongooseUrl} from "../info/mongooseConnect";

mongoose.connect(mongooseUrl, {dbName: "chatApp"}).then(() => {
    console.log("mondoDB connected");
})

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({
        user: User,
        chat: Chat,
        message: Message
    })
})

app.listen(port, () => {
    console.log(`app running on port number ${port}`);
})