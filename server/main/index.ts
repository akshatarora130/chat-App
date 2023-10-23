import express from "express";
import cors from "cors";

import {port} from "../info/port"

const app = express();
app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`app running on port number ${port}`);
})