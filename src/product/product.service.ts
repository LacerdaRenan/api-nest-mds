import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import repositorio from './product.repo'
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto): Product {

    let id = repositorio.idAvailable++;

    let newProduct = {
      id: id,
      ...createProductDto,
    }

    repositorio.produtosCadastrados.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return repositorio.produtosCadastrados;
  }

  findOne(id: number): Product{
    const search = repositorio.produtosCadastrados.find(p => p.id == id)
    if(search) return search;
    throw new BadRequestException('not-found');
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number): void {
    if(this.findOne(id)){
      let newProducts = repositorio.produtosCadastrados.filter(p=>p.id != id);
      repositorio.produtosCadastrados = newProducts;
      return
    }
    throw new BadRequestException('not-found');
  }
}
