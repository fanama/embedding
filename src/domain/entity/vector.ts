import { repoEmbedding } from "../repo/repoEmbedding.js";

function getNorm(vector :number[]):number{

  const res = vector.reduce((acc,curr)=>acc+curr*curr,0)

  return Math.sqrt(res)
}

export class Vector {
  title: string;
  text: string;
  value: number[];
  norm: number;
  controller: repoEmbedding;

  constructor(title: string, text: string, controller: repoEmbedding) {
    this.text = text;
    this.title = title;
    this.controller = controller;

    this.value = [];
    this.norm = 0;
  }

  exist(): boolean {
    return this.value.length > 0;
  }

  async setValue() {
    this.value = await this.controller.generate(this.text);
    this.norm = getNorm(this.value)
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
