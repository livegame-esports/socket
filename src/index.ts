import express, { Request, Response } from "express";
import { Server, Socket, ServerOptions } from "socket.io";
import { PORT, ORIGIN } from "./environments";
import { createServer } from "http";
import cors from "cors";

const socket_options: Partial<ServerOptions> = {
    cors: {
        origin: ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
    },
};

const app = express();
const server = createServer(app);
const ws = new Server(server, socket_options);

app.use(cors);

app.get("/", (req: Request, res: Response) => {
    res.json({
        name: "socket-server",
        description: "LiveGame - Socket server",
        repository: "https://github.com/livegame-esports/socket-server.git",
    });
});

ws.on("connection", (socket: Socket) => {
    socket.emit("getId", socket.id);
});

server.listen(PORT, () => {
    console.log(`Socket server listening on ${PORT}`);
});
