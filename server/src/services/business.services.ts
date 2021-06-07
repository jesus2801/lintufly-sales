import { v4, validate } from 'uuid';
import { Types } from 'mongoose';
import v from 'validator';

import { EmployeeData } from '@interfaces/schema/employee.interfaces';
import { BusinessInfo, BusinessUpdates } from '@interfaces/schema/business.interfaces';

import { ServiceError } from '@utils/handler.errors';

import EmployeeModel from '@models/Employee.model';
import BusinessModel from '@models/Business.model';

import { hashPass } from '@functions';
import authServices from './auth.services';

class BusinessServices {
  public async create(
    data: BusinessInfo,
    admin: Omit<EmployeeData, 'store' | 'business'>,
  ): Promise<string> {
    if (!v.isEmail(data.mail) || !v.isEmail(admin.mail))
      throw new ServiceError('invalid email');

    if (admin.pass.length < 6) throw new ServiceError('invalid password');

    const newBusiness = new BusinessModel(data);
    newBusiness.code = v4();
    await newBusiness.save();

    const adminUser = new EmployeeModel();
    adminUser.name = admin.name;
    adminUser.business = new Types.ObjectId(newBusiness._id);
    adminUser.mail = admin.mail;
    adminUser.pass = await hashPass(admin.pass);
    adminUser.role = 'admin';
    adminUser.avatar = 'a-1';
    adminUser.code = 'code';
    adminUser.union = Date.now();
    await adminUser.save();

    //creo el payload del usuario y retorno el token firmado
    return authServices.signToken({
      role: 'admin',
      mail: admin.mail,
      name: admin.name,
      sub: adminUser._id,
      businessId: newBusiness._id,
      businessName: data.name,
      avatar: 'a-1',
    });
  }

  public async get(_id: string) {
    return await BusinessModel.findById(_id).select('-state -code');
  }

  public async update(_id: string, updates: BusinessUpdates): Promise<boolean> {
    if (updates.mail && !v.isEmail(updates.mail)) throw new ServiceError('invalid email');

    await BusinessModel.updateOne({ _id }, updates);
    return false;
  }

  public async delete(_id: string) {
    //TODO: eliminar todo lo que esté anexado a la empresa
    await BusinessModel.deleteOne({ _id });
    return false;
  }

  public async all(page: number) {
    return await BusinessModel.paginate(
      {},
      { page, limit: 15, sort: { union: -1 }, select: '-state -code' },
    );
  }

  public async search(name: string, page: number) {
    return await BusinessModel.paginate(
      { name: { $regex: name, $options: 'i' } },
      { page, limit: 15, select: '-state -code' },
    );
  }

  public async getWithCode(code: string) {
    if (!validate(code)) throw new ServiceError('invalid code');

    return await BusinessModel.findOne({ code }).select('-state -code');
  }
}

export default new BusinessServices();
