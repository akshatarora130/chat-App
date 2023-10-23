"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const port_1 = require("../info/port");
const userModel_1 = require("../databaseModels/userModel");
const chatModel_1 = require("../databaseModels/chatModel");
const messageModel_1 = require("../databaseModels/messageModel");
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseConnect_1 = require("../info/mongooseConnect");
mongoose_1.default.connect(mongooseConnect_1.mongooseUrl, { dbName: "chatApp" }).then(() => {
    console.log("mondoDB connected");
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send({
        user: userModel_1.User,
        chat: chatModel_1.Chat,
        message: messageModel_1.Message
    });
});
app.listen(port_1.port, () => {
    console.log(`app running on port number ${port_1.port}`);
});
