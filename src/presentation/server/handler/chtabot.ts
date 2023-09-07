import { Request, Response } from 'express';
import { Server } from "socket.io";
import { Chatbot } from '../../../domain/entity/chatbot.js';


export class ChatbotHandler {
  entity: Chatbot;


  constructor(entity: Chatbot) {
    this.entity = entity;
  }

  async chat (req: Request, res: Response) {

    const question = req.body.question;

    if (!question) {
      return res.send("please ask me a question");
    }

    const io = (req as any).io as Server;

    const socketID = req.body.socketID;

    if (!socketID) {
      return res.send("no socketID");
    }


    const handler = (token: string) => {
      io.to(socketID).emit("message", token);
    };


    const response = await this.entity.ask(question as string, handler);


    res.send(response);
  }
}