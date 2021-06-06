/**
 * Interface para la configuración de la clase Master que maneja los clusters
 * @category Interfaces
 * @subcategory Main
 */
export interface MasterConfig {
  /**
   * Cluster principal
   */
  cluster: any;
}

/**
 * Contexto de los resolvers de graphql
 */
export interface GrahpqlCtx {
  user: UserPayload | null;
}

/**
 * Todos los posibles roles de la aplicación
 */
export type AppRols = 'admin' | 'client' | 'employee';

/**
 * Información que almacena el token de los usuarios
 */
export interface UserPayload {
  /**
   * Roles de la aplicación
   */
  role: AppRols;
}
