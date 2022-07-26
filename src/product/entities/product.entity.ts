import { Estoque } from "./estoque-entity";
export class Product {
  id: number;
  nome: string;
  preco: number;
  estoque: Estoque[];
}
