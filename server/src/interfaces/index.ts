import type { MercuriusContext } from 'mercurius';
import type { FastifyReply } from 'fastify';

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

export type AdminRole = 'admin';
export type ClientRole = 'client';
export type EmployeeRole = 'employee';
/**
 * Todos los posibles roles de la aplicación
 */
export type AppRoles = AdminRole | ClientRole | EmployeeRole;

/**
 * Información que almacena el token de los usuarios
 */
export type UserPayload =
  | {
      /**
       * Rol del usuario
       */
      role: ClientRole;
      /**
       * Id del usuario
       */
      sub: string;
      /**
       * Email del usuario
       */
      mail: string;
      /**
       * Nombre del usuario
       */
      name: string;
    }
  | {
      /**
       * Rol del usuario
       */
      role: AdminRole | EmployeeRole;
      /**
       * Id del usuario
       */
      sub: string;
      /**
       * Email del usuario
       */
      mail: string;
      /**
       * Nombre del usuario
       */
      name: string;
      /**
       * Id de la empresa a la que pertenece el usuario
       */
      businessId: string;
      /**
       * Nombre de la empresa a la que pertenece el usuario
       */
      businessName: string;
      /**
       * Id de la tienda o local a la que pertenece el usuario
       */
      storeId?: string;
      /**
       * Nombre de la tienda o local a la que pertenece el usuario
       */
      storeName?: string;
      /**
       * avatar del usuario
       */
      avatar: string;
    };

export interface GraphqlCtx extends MercuriusContext {
  user: UserPayload | null;
}
