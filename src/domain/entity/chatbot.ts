import { repoChatbot } from "../repo/repoChatbot.js";

export class Chatbot {
  controller: repoChatbot;

  constructor(controller: repoChatbot) {
    this.controller = controller;
    console.log("model loaded !");
  }


  updateModel (modelPath: string): void {
    this.controller.updateModel(modelPath);
  }

  async ask (question: string, handler: (token: string) => void = (token: string) => { process.stdout.write(token); }): Promise<string> {
    return await this.controller.ask(question, handler);
  }
}
