import { Types } from 'mongoose';
import { v4 } from 'uuid';

import { EmployeeData, EmployeeDoc } from '@interfaces/schema/employee.interfaces';

import eventEmmiter from 'events/event.emitter';

import Employee from '@models/Employee.model';

import BusinessModel from '@models/Employee.model';
import { Business } from '@interfaces/schema/business.interfaces';
import { hashPass } from '@functions';

/**
 * Capa de servicios para los empleados
 */
class EmployeeServices {
  /**
   * Servicio para crear un empleado
   * @param data información del usuario a crear
   * @returns {EmployeeDoc} retorna el usuario creado
   */
  public async create(data: EmployeeData, key: string): Promise<EmployeeDoc> {
    //buscamos a la empresa a la que se quieren unir
    const company: Business = await BusinessModel.findById(data.business);

    //si el código es diferente al de la empresa no lo dejamos seguir
    if (company.code !== key) {
      throw 'invalid code';
    }

    //si el código es el mismo, creamos al usuario
    const employee = new Employee(),
      c = v4();

    //insertor todos los datos del empleado
    employee.name = data.name;
    employee.business = new Types.ObjectId(data.business);
    employee.store = new Types.ObjectId(data.store);
    employee.mail = data.mail;
    employee.state = data.state;
    employee.pass = await hashPass(data.pass);
    employee.role = data.role;
    employee.avatar = data.avatar;
    employee.code = c;
    employee.union = Date.now();
    await employee.save();

    //emito el registro del usuario para comenzar a enviarle un correo
    eventEmmiter.emit('user_signup', data.mail, data.name, c);
    return employee;
  }
}

export default new EmployeeServices();
