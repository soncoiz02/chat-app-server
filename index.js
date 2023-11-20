import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import { Server } from 'socket.io';
import authRoute from './src/routes/auth';
import chatRoute from './src/routes/chat';
import colorRoute from './src/routes/color';
import friendRequestRoute from './src/routes/friendRequest';
import userRoute from './src/routes/user';
import messageRoute from './src/routes/message';
import { saveFriendMessage } from './src/controllers/message';

// ------------------------------------------------------------
const app = express();

const server = http.createServer(app);

dotenv.config();
app.use(cors());
app.use(express.json());

// -------------------------------------------------------------

app.use('/api', colorRoute)
app.use('/api/auth', authRoute)
app.use('/api', userRoute)
app.use('/api', friendRequestRoute)
app.use('/api', chatRoute)
app.use('/api', messageRoute)

// ---------------------------------------------------------

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET, POST'],
    },
});

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected socket`);

    socket.on('join-room', (data) => {
        const { roomId, userName } = data
        socket.join(roomId)
        console.log(`User ${userName} join room: ${roomId}`);
    })

    socket.on('send-message', data => {
        if ("groupId" in data)
            socket.to(data.groupId).emit('receive-message', data)
        if ("chatId" in data)
            socket.to(data.chatId).emit('receive-message', data)
        saveFriendMessage(data)
    })
});


// --------------------------------------------------------------

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
