import { Vector } from "../entity/vector.js";

export interface repoDocument {
    get(filename:string ,path: string): Promise<Vector> 
}