import express from 'express'
import { repoDocument } from '../../../domain/repo/repoDocument.js';

export class PdfHandler {

    documentController:repoDocument

    constructor(documentController:repoDocument){
        this.documentController = documentController
    }

    async embed  (req:express.Request, res:express.Response) {
        const filename = req.query.filename;
        if (!filename) {
          return res.status(400).send("filename parameter is missing.");
        }
      
        const pathName = "./pdf/"+ filename
      
        const vector = await this.documentController.get(filename as string,pathName)
      
        try {
          await vector.setValue();
      
          return res.send(vector);
        } catch (error) {
          res.status(500).json({ error });
        }
      }



}