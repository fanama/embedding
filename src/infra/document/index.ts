import fs from "fs";
import pdfParse from "pdf-parse";
import { Vector } from "../../domain/entity/vector.js";
import { repoEmbedding } from "../../domain/repo/repoEmbedding.js";

export class DocumentConttroller {
  controller: repoEmbedding;
  constructor(controller: repoEmbedding) {
    this.controller = controller;
  }

  async get(filename:string ,path: string): Promise<Vector> {
    const document = fs.readFileSync(path);

    const pdfExtract = await pdfParse(document);
    const vector = new Vector(filename, pdfExtract.text, this.controller);

    return vector;
  }
}
