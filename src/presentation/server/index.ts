import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from "socket.io";
import { router as vectorRouter } from './router/vector.js';
import { router as pdfRouter } from './router/pdf.js';
import { router as chatbotRouter } from './router/chatbot.js';

export function runServer (port: number = 3000) {

  console.log({ port });

  const app = express();

  app.use(cors({ origin: "*" }));
  app.use(express.urlencoded({ extended: false }));

  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('user connected');

    socket.emit("ID", socket.id);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  app.use((req, _, next) => {
    (req as any).io = io;
    next();
  });

  app.use(express.json());

  app.use("/vector", vectorRouter);
  app.use("/pdf", pdfRouter);
  app.use("/chatbot", chatbotRouter);

  app.use("/", express.static("public"));

  server.listen(port, () => { `http://localhost:${port}`; });
}