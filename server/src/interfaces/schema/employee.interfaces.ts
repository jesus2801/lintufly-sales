export interface LoginData {
  /**
   * Email del empleado
   */
  mail: string;
  /**
   * Contraseña del empleado
   */
  pass: string;
}

/**
 * Información del input del logueo del empleado
 */
export interface LoginInput {
  input: LoginData;
}

/**
 * Información del empleado
 */
export interface EmployeeData extends LoginData {
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
  store?: string;
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
