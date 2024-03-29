import { EmployeeData } from './employee.interfaces';

/**
 * Interfaz para los input que tomen el _id de mongoDB
 * @category Schema
 */
export interface IdInput {
  /**
   * Id del documento que contiene a la empresa
   */
  _id: string;
}

/**
 * Interfaz para los códigos ingresados
 */
export interface CodeInterface {
  /**
   * Código
   */
  code: string;
}

/**
 * Interfaz para recibir la página actual cuando se pidan datos paginados
 * @category Schema
 */
export interface PaginateInput {
  /**
   * Pagina actual
   */
  page: number;
}

/**
 * Interfaz para buscar valores por el nombre
 * @category Schema
 */
export interface NameInput {
  /**
   * Input de graphql
   */
  input: {
    /**
     * Página actual de los datos
     */
    page: number;
    /**
     * nombre a buscar
     */
    name: string;
  };
}

/**
 * Interfaz que describe los posibles cambios a realizar en una empresa
 */
export interface BusinessUpdates {
  /**
   * Nombre de la empresa
   */
  name?: string;
  /**
   * Email de la empresa
   */
  mail?: string;
  /**
   * Estado en el que se encuentra la empresa
   */
  state?: boolean;
  /**
   * Tipo de divisa que maneja la empresa
   */
  currency?: string;
  /**
   * Número de contacto de la empresa
   */
  phones?: string[];
}

/**
 * Interfaz del input para actualizar la información de una empresa
 * @category Schema
 */
export interface UpdateBusinessInput {
  /**
   * Input de graphql
   */
  input: {
    /**
     * Id del documento que contiene a la empresa
     */
    _id: string;
    /**
     * Campos a actualizar del documento
     */
    updates: BusinessUpdates;
  };
}

/**
 * Información de las empresas
 * @category Schema
 */
export interface BusinessInfo {
  /**
   * Nombre de la empresa
   */
  name: string;
  /**
   * Email de la empresa
   */
  mail: string;
  /**
   * Tipo de divisa que maneja la empresa
   */
  currency: string;
  /**
   * Número de contacto de la empresa
   */
  phones: string[];
  /**
   * Imagenes que representen a la empresa
   */
  imgs: string[];
}

/**
 * Input para agregar una empresa
 * @category Schema
 */
export interface BusinessInput {
  /**
   * Información de la empresa a ingresar
   */
  business: BusinessInfo;
  /**
   * Información del administrador de la empresa
   */
  admin: Omit<EmployeeData, 'store' | 'business'>;
  /**
   * Token del recaptcha para verificar que no es un robot
   */
  recaptcha: string;
}
