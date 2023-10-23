"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const port_1 = require("../info/port");
const loginRoute_1 = __importDefault(require("../routes/user/loginRoute"));
const signupRoute_1 = __importDefault(require("../routes/user/signupRoute"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseConnect_1 = require("../info/mongooseConnect");
mongoose_1.default.connect(mongooseConnect_1.mongooseUrl, { dbName: "chatApp" }).then(() => {
    console.log("mondoDB connected");
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", signupRoute_1.default);
app.use("/", loginRoute_1.default);
app.listen(port_1.port, () => {
    console.log(`app running on port number ${port_1.port}`);
});
