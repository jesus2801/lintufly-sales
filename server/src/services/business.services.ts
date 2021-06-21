import { v4, validate } from 'uuid';
import axios from 'axios';
import v from 'validator';

import { BusinessInfo, BusinessUpdates } from '@interfaces/schema/business.interfaces';
import { EmployeeData } from '@interfaces/schema/employee.interfaces';
import { PaginateResults } from '@interfaces/schema';

import { handlerErrors, ServiceError } from '@utils/handler.errors';
import errorCodes from '@utils/error.codes';

import BusinessModel, { IBusiness } from '@models/Business.model';
import { deleteBusinessRelations } from '@models/helpers';
import EmployeeModel from '@models/Employee.model';

import { hashPass } from '@functions';

import config from '@config';

/**
 * Clase de servicios para las acciones con respecto a las empresas
 */
class BusinessServices {
  /**
   * Servicio para crear una nueva empresa
   * @param {BusinessInfo} data información de la empresa a crear
   * @param {Omit<EmployeeData, 'store' | 'business'>} admin información del administrador de la empresa
   * @returns {boolean} retorna el token del administrador
   */
  public async create(
    data: BusinessInfo,
    admin: Omit<EmployeeData, 'store' | 'business'>,
    recaptcha: string,
  ): Promise<boolean> {
    //validar los email de la empresa y el empleado
    if (!v.isEmail(data.mail) || !v.isEmail(admin.mail))
      throw new ServiceError(errorCodes.invalidEmail);

    //si la contraseña tiene menos de 6 carácteres es inválida
    if (admin.pass.length < 6) throw new ServiceError(errorCodes.invalidPass);

    //si no hay telefonos retrocedemos
    if (data.phones.length === 0) throw new ServiceError(errorCodes.noBusinessPhone);

    //si no hay fotos retrocedemos
    if (data.imgs.length === 0) throw new ServiceError(errorCodes.noBusinessImgs);

    //respuesta de google recaptcha
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify?',
      `secret=${config.server.recaptchaKey}&response=${recaptcha}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    //verficamos que la respuesta de google sea positiva
    if (!response.data.success) throw new ServiceError(errorCodes.invalidRecaptcha);

    //creamos la nueva empresa
    const newBusiness = new BusinessModel(data);
    //asignamos un código de unión para los empleados de la empresa
    newBusiness.code = v4();
    //se asigna estado en falso a la empresa hasta que nos comuniquemos con ella
    newBusiness.state = false;
    //guardamos la empresa
    try {
      await newBusiness.save();
    } catch (e) {
      if (e.name === 'MongoError' && e.code === 11000) {
        if (Object.keys(e.keyValue)[0] === 'name')
          throw new ServiceError(errorCodes.duplicate.businessName);

        if (Object.keys(e.keyValue)[0] === 'mail')
          throw new ServiceError(errorCodes.duplicate.businessMail);
      }
    }

    //creamos el usuario
    const adminUser = new EmployeeModel();
    //seteamos la información del usuario
    adminUser.name = admin.name;
    adminUser.business = newBusiness._id;
    adminUser.mail = admin.mail;
    adminUser.pass = await hashPass(admin.pass);
    adminUser.role = 'admin';
    adminUser.avatar = 'a-1';
    adminUser.code = v4();
    adminUser.union = Date.now();
    try {
      //guardamos el usuario
      await adminUser.save();
    } catch (e) {
      newBusiness.delete().catch((e: any) => handlerErrors(e));

      if (e.name === 'MongoError' && e.code === 11000)
        throw new ServiceError(errorCodes.duplicate.employeeMail);
    }

    //creo el payload del usuario y retorno el token firmado
    return false;
  }

  /**
   * Servicio para obtener una empresa por su id
   * @param {string} _id id de la empresa a obtener
   * @returns {IBusiness|null} retorno la empresa buscada o `null` si no existe
   */
  public async get(_id: string): Promise<IBusiness | null> {
    return await BusinessModel.findById(_id).select('-state -code');
  }

  /**
   * Servicio para actualizar una empresa
   * @param {string} _id id de la empresa a editar
   * @param {BusinessUpdates} updates las actualizaciones a hacer de la empresa
   * @returns {boolean} retorno `false` indicando que todo ha estado correcto
   */
  public async update(_id: string, updates: BusinessUpdates): Promise<boolean> {
    if (updates.mail && !v.isEmail(updates.mail))
      throw new ServiceError(errorCodes.invalidEmail);

    await BusinessModel.updateOne({ _id }, updates);
    return false;
  }

  /**
   * Servicio para eliminar una empresa
   * @param {string} _id id de la empresa a eliminar
   * @returns {boolean} retorno `false` indicando que todo ha estado correcto
   */
  public async delete(_id: string): Promise<boolean> {
    deleteBusinessRelations(_id);
    await BusinessModel.deleteOne({ _id });
    return false;
  }

  /**
   * Servicio para retornar las empresas de la plataforma de manera paginada
   * @param {number} page página a solicitar de las empresas
   * @returns {PaginateResults<IBusiness>} retorno las empresas
   * correspondientes a la página ingresada
   */
  public async all(page: number): Promise<PaginateResults<IBusiness>> {
    return await BusinessModel.paginate(
      {},
      { page, limit: 15, sort: { union: -1 }, select: '-state -code' },
    );
  }

  /**
   * Servicio para buscar empresas de la plataforma
   * @param {string} name nombre a buscar en las empresas
   * @param {number} page página a buscar de ese nombre
   * @returns {PaginateResult<IBusiness>} retorno el resultado de la búsqueda
   */
  public async search(name: string, page: number): Promise<PaginateResults<IBusiness>> {
    return await BusinessModel.paginate(
      { name: { $regex: name, $options: 'i' } },
      { page, limit: 15, select: '-state -code' },
    );
  }

  /**
   * Servicio para obtener a una empresa por medio del código
   * @param {string} code código de la empresa a buscar
   * @returns {IBusiness | null} retorno la empresa buscada y si no existe retorno `null`
   */
  public async getWithCode(code: string): Promise<IBusiness | null> {
    if (!validate(code)) throw new ServiceError(errorCodes.invalidCode);

    return await BusinessModel.findOne({ code }).select('-state -code');
  }
}

export default new BusinessServices();
