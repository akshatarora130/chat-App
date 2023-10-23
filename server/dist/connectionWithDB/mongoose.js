"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseConnect_1 = require("../info/mongooseConnect");
mongoose_1.default.connect(mongooseConnect_1.mongooseUrl, { dbName: "chatApp" })
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});
exports.default = mongoose_1.default;
