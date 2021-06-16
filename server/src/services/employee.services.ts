import { v4 } from 'uuid';
import v from 'validator';

import { EmployeeData } from '@interfaces/schema/employee.interfaces';

import EmployeeModel, { IEmployee } from '@models/Employee.model';
import StoreModel, { IStore } from '@models/Store.model';
import BusinessModel from '@models/Business.model';

import { ServiceError } from '@utils/handler.errors';
import errorCodes from '@utils/error.codes';

import { comparePass, hashPass } from '@functions';

import eventEmmiter from '@events/event.emitter';

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

    //si el usuario está desactivado retorno ese error
    if (!user.state) throw new ServiceError(errorCodes.employeeInactive);

    //buscamos el nombre de la empresa
    const business = await BusinessModel.findById(user.business).select(
      'name state currency',
    );

    //valido que la empresa exista
    if (!business) {
      //se reporta el error porque no es para nada correcto que esto halla pasado
      eventEmmiter.emit('employee_dont_have_business', user);
      //se devuelve el código de error correspondiente
      throw new ServiceError(errorCodes.employeeDontHaveBusiness);
    }

    //si la empresa está inactiva, retorno ese error
    if (!business.state) throw new ServiceError(errorCodes.businessInactive);

    //buscamos el nombre del local al que pertenece (si está en un local)
    let store: null | IStore = null;
    if (user.store) store = await StoreModel.findById(user.store).select('name');

    //creo el payload del usuario
    const payload = {
      role: user.role,
      mail: user.mail,
      name: user.name,
      sub: user._id,
      businessId: user.business,
      businessName: business.name,
      storeId: user.store,
      storeName: store ? store.name : undefined,
      avatar: user.avatar,
      currency: business.currency,
    };

    // retorno el token firmado y el payload
    return {
      token: authServices.signToken(payload),
      payload,
    };
  }
}

export default new EmployeeServices();
