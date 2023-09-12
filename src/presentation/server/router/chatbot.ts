import express from 'express';
import { Chatbot as ChatbotController } from '../../../infra/ai/index.js';
import { Chatbot as ChatbotEntity } from '../../../domain/entity/chatbot.js';
import { ChatbotHandler } from '../handler/chtabot.js';

import { config } from 'dotenv';

config();
export const router = express.Router();

const chatBotController = new ChatbotController(process.env.MODEL_PATH || "");
const chatBotEntity = new ChatbotEntity(chatBotController);

const handler = new ChatbotHandler(chatBotEntity);

router.post("/chat", handler.chat.bind(handler));
