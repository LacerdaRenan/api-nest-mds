import { Estoque } from "../entities/estoque-entity";

export class UpdateProductDto {
    nome: string;
    preco: number;
    estoque: Estoque[]=[]
  }
  