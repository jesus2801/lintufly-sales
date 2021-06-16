import { ProductInfo } from '@interfaces/schema/product.interfaces';

import ProductModel from '@models/Product.model';

class ProductServices {
  /**
   * Servicio para crear un nuevo producto a una empresa
   * @param {ProductInfo} productInfo información del producto a crear
   * @param {string} business id de la empresa a la que se le asigna ese producto
   * @returns {string}
   */
  public async create(productInfo: ProductInfo, business: string): Promise<string> {
    //creamos el producto con las propiedades enviadas
    const product = new ProductModel(productInfo);
    //le añadimos el id de la empresa
    product.business = business;
    //lo guardamos
    await product.save();

    //retornamos el id del producto
    return product._id;
  }

  public async get(business: string) {
    return await ProductModel.find({ business });
  }
}

export default new ProductServices();