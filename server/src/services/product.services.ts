import { ProductChanges, ProductInfo } from '@interfaces/schema/product.interfaces';

import { deleteProductImages } from '@models/helpers';
import ProductModel from '@models/Product.model';
import errorCodes from '@utils/error.codes';
import { handlerErrors, ServiceError } from '@utils/handler.errors';

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

  //obtener todos los productos de una empresa
  public async get(business: string) {
    return await ProductModel.find({ business });
  }

  //eliminar un producto de una empresa
  public async delete(_id: string, business: string) {
    //obtenemos el documento solo con sus imagenes
    const doc = await ProductModel.findOne({ _id, business }).select('imgs');

    //si no existe el documento lo reportamos y devolvemos al usuario
    if (!doc) {
      handlerErrors(new Error(errorCodes.productNonFoundOnDelete));
      throw new ServiceError(errorCodes.productNonFoundOnDelete);
    }

    //eliminamos las imagenes de firebase storage
    deleteProductImages(doc.imgs);
    //eliminamos el documento
    await doc.delete();
    return false;
  }

  //actualizar un producto de una empresa
  public async update(changes: ProductChanges, _id: string, business: string) {
    await ProductModel.updateOne({ _id, business }, changes);
    return false;
  }
}

export default new ProductServices();
