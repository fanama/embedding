import { Request, Response } from 'express';
import { Chatbot } from '../../../domain/entity/chatbot.js';
import Queue from 'bull';

export class ChatbotHandler {
  private readonly entity: Chatbot;
  private readonly queue: Queue.Queue;

  constructor(entity: Chatbot) {
    this.entity = entity;
    this.queue = new Queue('chat-queue');
    this.initializeQueue();
  }

  private initializeQueue (): void {
    this.queue.on('active', () => console.log('Queue is active'));
    this.queue.on('stalled', () => console.log('Queue is stalled'));

    this.queue.process(1, async (job, done) => {
      try {
        const { question, socketID } = job.data;
        const response = await this.processQuestion(question, socketID);
        done(null, response);
      } catch (error) {
        done(null, error);
      }
    });
  }

  private async processQuestion (question: string, socketID: string | undefined): Promise<string> {
    const handler = (token: string) => console.log({ socketID, question, token });
    return this.entity.ask(question, handler);
  }

  async chat (req: Request, res: Response): Promise<void> {
    try {
      const { question, socketID } = req.body;

      if (!question) {
        res.status(400).send('Please ask me a question');
        return;
      }

      if (!socketID) {
        res.status(400).send('No socketID provided');
        return;
      }

      const job = await this.queue.add({ question, socketID });

      job.finished()
        .then(response => res.send(response))
        .catch(error => console.error(error));

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
