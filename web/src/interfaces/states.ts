/**
 * Mínima información de un producto
 */
export interface MinProductsInfo {
  /**
   * Id del producto
   */
  _id: string;
  /**
   * Nombre del producto
   */
  name: string;
  /**
   * Precio del producto
   */
  price: number;
}

/**
 * Información complete de un producto
 */
export interface CompleteProduct extends MinProductsInfo {
  /**
   * Imagenes del producto
   */
  imgs: string[];
  /**
   * Comentarios del producto
   */
  comments: string[];
  /**
   * Descripción del producto
   */
  desc?: string;
}
