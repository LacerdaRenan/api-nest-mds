import { Product } from './entities/product.entity';
class database {
  private idAvailable = 1;
  public produtosCadastrados: Product[] = [];
  public newId(): number {
    return this.idAvailable++;
  }
}

export default new database();
