import { AppRoles } from '..';

/**
 * Información del empleado
 */
export interface EmployeeData {
  /**
   * Nombre del empleado
   */
  name: string;

  /**
   * Id de la empresa del empleado
   */
  business: string;

  /**
   * Id de la tienda del empleado
   */
  store: string;

  /**
   * Email del empleado
   */
  mail: string;

  /**
   * Estado del empleado
   */
  state: boolean;

  /**
   * Contraseña del empleado
   */
  pass: string;

  /**
   * rol del empleado
   */
  role: AppRoles;

  /**
   * Avatar del empleado
   */
  avatar: string;
}

/**
 * Input de cuando se crea un empleado
 */
export interface EmployeeInput {
  /**
   * Input del empleado
   */
  input: EmployeeData;
  /**
   * Código de unión a la empresa
   */
  key: string;
}

export interface EmployeeDoc extends EmployeeData {
  /**
   * Id del documento del empleado
   */
  _id: string;
  /**
   * Codigo de verificación del empleado
   */
  code: string;
  /**
   * Fecha de registro del empleado en la plataforma en milisegundos
   */
  union: number;
}
