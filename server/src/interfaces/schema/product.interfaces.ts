/**
 * Información nesecaria para crear un producto
 */
export interface ProductInfo {
  /**
   * Nombre del producto
   */
  name: string;
  /**
   * Precio del producto
   */
  price: number;
  /**
   * Imagenes del producto
   */
  imgs: string[];
  /**
   * Descripción del producto
   */
  desc?: string;
}

/**
 * Input para ingresar un producto
 */
export interface ProductInput {
  /**
   * Input del producto
   */
  input: ProductInfo;
}
