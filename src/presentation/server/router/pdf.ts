import express from 'express'
import { PdfHandler } from '../handler/pdf.js'
import { DocumentConttroller } from '../../../infra/document/index.js';
import { Embedding } from '../../../infra/embedding/index.js';

export const router = express.Router()

const embedder = new Embedding();
const documentController = new DocumentConttroller(embedder)

const pdfHandler = new PdfHandler(documentController)

router.get("/",pdfHandler.embed.bind(pdfHandler))
