import express from 'express'
import { Embedding } from '../../../infra/embedding/index.js';
import { VectorHandler } from '../handler/vector.js';

export const router = express.Router()

const embedder = new Embedding();

const vectorHandler = new VectorHandler(embedder)
vectorHandler.controller = embedder
router.get("/", vectorHandler.embed.bind(vectorHandler));
router.get("/compare", vectorHandler.compare.bind(vectorHandler));

