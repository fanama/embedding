import { repoEmbedding } from "../repo/repoEmbedding.js";

export class Vector {
  title: string;
  text: string;
  value: number[];
  private controller: repoEmbedding;

  constructor(title: string, text: string, controller: repoEmbedding) {
    this.text = text;
    this.title = title;
    this.controller = controller;
    this.value = [];
  }

  exist(): boolean {
    return this.value.length > 0;
  }

  async setValue() {
    this.value = await this.controller.generate(this.text);
  }

  compareOne(vector: Vector): number {
    return this.controller.compare(this.value, vector.value);
  }

  compareMany(vectors: Vector[]): Vector {
    let closestVector = vectors[0];
    let val = this.compareOne(closestVector);

    for (const vector of vectors) {
      const val2 = this.compareOne(vector);
      if (val2 > val) {
        val = val2;
        closestVector = vector;
      }
    }

    return closestVector;
  }
}
