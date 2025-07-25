import express from "express";
import {createServer} from "node:http";


import {Server} from "socket.io";

import mongoose from "mongoose";

import cors from "cors";
import { log } from "node:console";

import userRoutes from "./routes/users.routes.js"
import { connectToSocket } from "./controllers/SocketManager.js";
const app = express();

const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))

app.use(cors());

app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit: "40kb", extended:true}));

app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res)=> {
    return res.json({"hello":"world"})
});

const start = async() => {
    const connectionDb = await mongoose.connect("mongodb+srv://myksiddharth:sid&12579@cluster0.nc77lbq.mongodb.net/");
    console.log(`MONGO Connected DB host: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), ()=>{
        console.log("Listening on port number 8000");
        
    })
}

start();