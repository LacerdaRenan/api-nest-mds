import { BadRequestException } from "@nestjs/common";
import axios from "axios";
import { Estoque } from "../entities/estoque-entity";

export class EstoqueService{
    public async getEstoquesByProductId(idProduto: number): Promise<Estoque[]>{
        try{
            const requisicao = await axios.get(`http://localhost:3030/estoque/produto/${idProduto}`);
            return requisicao.data
        }catch(err){
            return []
        }
    }
}

export default new EstoqueService()
