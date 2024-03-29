/**
 * Información de la tienda o local
 */
export interface StoreData {
  /**
   * Nombre de la tienda o local
   */
  name: string;
  /**
   * empresa a la que pertenece la tienda o el local
   */
  business: string;
  /**
   * Dirección de la tienda o el local
   */
  dir?: string;
  /**
   * Descripción de la tienda o el local
   */
  desc?: string;
}

/**
 * Input para crear una tienda o local
 */
export interface StoreInput {
  /**
   * Input de graphql
   */
  input: StoreData;
}
