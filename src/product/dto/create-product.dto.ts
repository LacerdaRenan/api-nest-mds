import { Estoque } from "../entities/estoque-entity";

export class CreateProductDto {
  nome: string;
  preco: number;
  estoque: Estoque[] = [];
}
