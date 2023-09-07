import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";
import { LLM } from "llama-node";

import { LLamaCpp, type LoadConfig } from "llama-node/dist/llm/llama-cpp.js";
export class Chatbot_V0 {

  session: LlamaChatSession;

  constructor(modelPath: string) {

    const model = new LlamaModel({ modelPath });
    const context = new LlamaContext({ model });
    this.session = new LlamaChatSession({ context });
  }

  updateModel (modelPath: string): void {
    const model = new LlamaModel({ modelPath });
    const context = new LlamaContext({ model });
    this.session = new LlamaChatSession({ context });
  }

  async ask (question: string): Promise<string> {
    return await this.session.prompt(question);
  }

}

interface ChatResponse {
  tokens: string[];
}


export class Chatbot {

  session: any;

  constructor(modelPath: string) {
    const session = new LLM(LLamaCpp);
    const config: LoadConfig = {
      modelPath,
      enableLogging: true,
      nCtx: 1024,
      seed: 0,
      f16Kv: false,
      logitsAll: false,
      vocabOnly: false,
      useMlock: false,
      embedding: false,
      useMmap: true,
      nGpuLayers: 0
    };
    session.load(config);
    this.session = session;
  }

  updateModel (modelPath: string): void {
    const session = new LLM(LLamaCpp);
    const config: LoadConfig = {
      modelPath,
      enableLogging: true,
      nCtx: 1024,
      seed: 0,
      f16Kv: false,
      logitsAll: false,
      vocabOnly: false,
      useMlock: false,
      embedding: false,
      useMmap: true,
      nGpuLayers: 0
    };
    session.load(config);
    this.session = session;
  }

  async ask (question: string, handler: (token: string) => void = (token: string) => { process.stdout.write(token); }): Promise<string> {
    const params = {
      nThreads: 4,
      nTokPredict: 2048,
      topK: 40,
      topP: 0.1,
      temp: 0.2,
      repeatPenalty: 1,
      prompt: question,
    };
    const response: ChatResponse = await this.session.createCompletion(params, (response: any) => {
      handler(response.token);
    });

    return response.tokens.join("");
  }

}
