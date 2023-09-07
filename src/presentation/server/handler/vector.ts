import express from 'express'
import { repoEmbedding } from '../../../domain/repo/repoEmbedding.js';
import { Vector } from '../../../domain/entity/vector.js';

export class VectorHandler {

  controller: repoEmbedding

  constructor(controller: repoEmbedding) {
    this.controller = controller
  }

  async embed(req: express.Request, res: express.Response) {
    const text = req.query.text;
    if (!text) {
      return res.status(400).send("Text parameter is missing.");
    }





    try {
      const vector = new Vector("test", text as string, this.controller);
      await vector.setValue();
      console.log(vector)
      return res.send(vector);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async compare(req: express.Request, res: express.Response) {
    const text1 = req.query.text1;
    const text2 = req.query.text2;
    if (!text1 || !text2) {
      return res
        .status(400)
        .send("Both text1 and text2 parameters are required.");
    }

    try {
      const vector1 = new Vector("test", text1 as string, this.controller);
      await vector1.setValue();
      const vector2 = new Vector("test", text2 as string, this.controller);
      await vector2.setValue();
      const similarity = vector1.compareOne(vector2);
      return res.send({ similarity });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}