export interface repoEmbedding {
  generate: (text: string) => Promise<number[]>;
  ask: (question :string,context:string) => Promise<string>;
  compare: (vector1: number[], vector2: number[]) => number;
}
