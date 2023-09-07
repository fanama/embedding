import { pipeline } from "@xenova/transformers";
import {  Generator, IEmbedding } from "./types.js";

function dotProduct(a: number[], b: number[]) {
  if (a.length !== b.length) {
    throw new Error("Both arguments must have the same length");
  }

  let result = 0;

  for (let i = 0; i < a.length; i++) {
    result += a[i] * b[i];
  }

  return result;
}



export class Embedding {
  constructor() {}

  async generate(text: string): Promise<number[]> {
    const generateEmbeddings = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
    const embeddings:IEmbedding = await generateEmbeddings(text, {
      pooling: "mean",
      normalize: true,
    });

    return embeddings.data;
  }

  async ask(question :string="what's your name ?"):Promise<string>{
    try{let pipe = await pipeline('text-generation');


    let result:Generator[] = await pipe(question, 30, 3);
    const answer = result[0].generated_text

    return answer
  }catch(err){
    console.log({err})
      return JSON.stringify(err)
    }
}

  compare(vector1: number[], vector2: number[]): number {
    return dotProduct(vector1, vector2);
  }
}
