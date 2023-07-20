export interface repoEmbedding {
  generate: (text: string) => Promise<number[]>;
  compare: (vector1: number[], vector2: number[]) => number;
}
