import express from 'express';
import { Chatbot as ChatbotController } from '../../../infra/ai/index.js';
import { Chatbot as ChatbotEntity } from '../../../domain/entity/chatbot.js';
import { ChatbotHandler } from '../handler/chtabot.js';

export const router = express.Router();

const chatBotController = new ChatbotController("/home/fana/app/llama/ggml-vicuna-13B-1.1-q5_1.bin");
const chatBotEntity = new ChatbotEntity(chatBotController);

const handler = new ChatbotHandler(chatBotEntity);

router.post("/chat", handler.chat.bind(handler));
