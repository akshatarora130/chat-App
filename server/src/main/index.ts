import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { port } from "../info/port";
import { mongooseUrl } from "../info/mongooseConnect";
import userLogin from "../routes/user/loginRoute";
import userSignup from "../routes/user/signupRoute";
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
import { Server } from "socket.io";

mongoose.connect(mongooseUrl, { dbName: "chatApp" }).then(() => {
  console.log("mondoDB connected");
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userSignup);
app.use("/user", userLogin);
app.use("/user", searchedUsers);
app.use("/user", loggedInUserInfo);

app.use("/chat", createChat);
app.use("/chat", fetchChats);
app.use("/chat", createGroup);
app.use("/chat", renameGroup);
app.use("/chat", groupAdd);
app.use("/chat", groupRemove);

app.use("/message", sendMessage);
app.use("/message", fetchMessages);

const server = app.listen(port, () => {
  console.log(`server started on port number  ${port}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on('connection', (socket) => {
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("Connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room " + room);
  });

  socket.on("newMessage", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) {
      return console.log("chat.users not defined");
    }

    io.to(chat._id).emit("messageReceived", newMessageReceived);
  });

  socket.on('disconnect', () => {
    // Handle socket disconnect, remove from rooms, etc.
  });
});
