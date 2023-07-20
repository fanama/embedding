import { pipeline } from "@xenova/transformers";

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
    const embeddings = await generateEmbeddings(text, {
      pooling: "mean",
      normalize: true,
    });

    return embeddings.data as number[];
  }

  compare(vector1: number[], vector2: number[]): number {
    return dotProduct(vector1, vector2);
  }
}
