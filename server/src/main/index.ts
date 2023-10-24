import express from "express";
import cors from "cors";

import {port} from "../info/port"
import userLoginRoute from "../routes/user/loginRoute";
import userSignupRoute from "../routes/user/signupRoute"
import searchedUsers from "../routes/user/searchedUsers";
import mongoose from "mongoose";
import {mongooseUrl} from "../info/mongooseConnect";

mongoose.connect(mongooseUrl, {dbName: "chatApp"}).then(() => {
    console.log("mondoDB connected");
})

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userSignupRoute);        //       /user/signup
app.use("/", userLoginRoute);         //       /user/login
app.use("/", searchedUsers);          //       /user/searchedUsers


app.listen(port, () => {
    console.log(`app running on port number ${port}`);
})