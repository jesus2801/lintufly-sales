import { Schema, model, Types, Document } from 'mongoose';

import { EmployeeRole, AdminRole } from '@interfaces';
import { IModel } from '@interfaces/schema';

export interface IEmployee extends Document {
  /**
   * Email del empleado
   */
  mail: string;
  /**
   * Contraseña del empleado
   */
  pass: string;
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
  /**
   * Codigo de verificación del empleado
   */
  code: string;
  /**
   * Fecha de registro del empleado en la plataforma en milisegundos
   */
  union: number;
  /**
   * rol del empleado
   */
  role: EmployeeRole | AdminRole;
  /**
   * Estado del empleado
   */
  state: boolean;

  /**
   * Avatar del empleado
   */
  avatar: string;
}

/**
 * Schema de los empleados de las empresas
 * @category Models
 */
const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  business: {
    type: Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  store: {
    type: Types.ObjectId,
    ref: 'Store',
    required: false,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  pass: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'employee'],
  },
  avatar: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  union: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

export default model<IEmployee>('Employee', employeeSchema) as IModel<IEmployee>;
