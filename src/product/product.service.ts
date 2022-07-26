import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import EstoqueService from './estoque-service/estoqueService';
import repositorio from './product.repo';
import { Product } from './entities/product.entity';
import { Estoque } from './entities/estoque-entity';
@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto): Product {
    const id = repositorio.newId();

    const newProduct = {
      id: id,
      ...createProductDto
    };

    repositorio.produtosCadastrados.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return repositorio.produtosCadastrados;
  }

  findOne(id: number): Product {
    const search = repositorio.produtosCadastrados.find((p) => p.id == id);
    if (search) return search;
    throw new BadRequestException('not-found');
  }

  async findProductComplete(id:number): Promise<any>{
    const search = repositorio.produtosCadastrados.find((p) => p.id == id)
    if(search){
      const estoques = await EstoqueService.getEstoquesByProductId(id);
      search.estoque = estoques;
      return search;
    }
    throw new BadRequestException('not-found');
  }

  update(id: number, productDto: UpdateProductDto): Product {
    let newProduct: Product
    if (this.findOne(id)) {
      const newProducts = repositorio.produtosCadastrados.map((p) => {
        if (p.id == id) {
          newProduct = {
            id,
            ...productDto,
          };
          return newProduct
        }
        return p;
      });
      repositorio.produtosCadastrados = newProducts;
      return newProduct;
    }
    throw new BadRequestException('not-found');
  }
  

  remove(id: number): void {
    if (this.findOne(id)) {
      const newProducts = repositorio.produtosCadastrados.filter(
        (p) => p.id != id,
      );
      repositorio.produtosCadastrados = newProducts;
      return;
    }
    throw new BadRequestException('not-found');
  }
}
