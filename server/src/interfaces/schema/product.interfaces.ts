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

/**
 * Input necesario para eliminar un producto
 */
export interface ProductIdInput {
  /**
   * Id del producto a eliminar
   */
  _id: string;
}

export interface ProductChanges {
  /**
   * Nuevo nombre del product
   */
  name?: string;
  /**
   * Nuevo precio del producto
   */
  price?: number;
  /**
   * Nuevas imagenes del producto
   */
  imgs?: string[];
  /**
   * Nueva descripción del producto
   */
  desc?: string;
}

/**
 * Input de graphql para actualizar un producto
 */
export interface ProductChangesInput {
  /**
   * Información a cambiar del producto
   */
  changes: ProductChanges;
  /**
   * Id del producto
   */
  _id: string;
}
