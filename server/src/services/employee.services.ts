import { v4 } from 'uuid';
import v from 'validator';

import { EmployeeData } from '@interfaces/schema/employee.interfaces';

import EmployeeModel, { IEmployee } from '@models/Employee.model';
import BusinessModel from '@models/Employee.model';

import { comparePass, hashPass } from '@functions';

import eventEmmiter from '@events/event.emitter';

import { ServiceError } from '@utils/handler.errors';
import errorCodes from '@utils/error.codes';
import authServices from './auth.services';

/**
 * Capa de servicios para los empleados
 */
class EmployeeServices {
  /**
   * Servicio para crear un empleado
   * @param data información del usuario a crear
   * @returns {boolean} retorna el usuario creado
   */
  public async create(data: EmployeeData, key: string): Promise<boolean> {
    //buscamos a la empresa a la que se quieren unir
    const company = await BusinessModel.findById(data.business).select('code');

    if (!company) throw new ServiceError(errorCodes.nonExistentBusiness);

    //si el código es diferente al de la empresa no lo dejamos seguir
    if (company.code !== key) throw new ServiceError(errorCodes.invalidCode);

    //si el código es el mismo, creamos al usuario
    const employee = new EmployeeModel(),
      code = v4();

    //insertor todos los datos del empleado
    employee.name = data.name;
    employee.business = data.business;
    if (data.store) employee.store = data.store;
    employee.mail = data.mail;
    employee.pass = await hashPass(data.pass);
    employee.avatar = 'a-1';
    employee.code = code;
    employee.union = Date.now();
    await employee.save();

    //emito el registro del usuario para comenzar a enviarle un correo
    eventEmmiter.emit('user_signup', data.mail, data.name, code);
    return false;
  }

  public async login(mail: string, pass: string) {
    //si el email es invalido retorno código de email inválido
    if (!v.isEmail(mail)) throw new ServiceError(errorCodes.invalidEmail);

    //busco el usuario de acuerdo al email que me pasaron
    const user: IEmployee | null = await EmployeeModel.findOne({ mail });
    //si el usuario no existe retorno credenciales inválidas
    if (!user) throw new ServiceError(errorCodes.invalidCredentials);

    //si el usuario existe, verifico que la contraseña sea correcta
    const isValid: boolean = await comparePass(pass, user.pass);
    //si la contraseña no es correcta retorno credenciales inválidas
    if (!isValid) throw new ServiceError(errorCodes.invalidCredentials);

    //creo el payload del usuario y retorno el token firmado
    return authServices.signToken({
      role: user.role,
      mail: user.mail,
      name: user.name,
      sub: user._id,
      businessId: '',
      businessName: '',
      storeId: '',
      storeName: '',
      avatar: '',
    });
  }
}

export default new EmployeeServices();
