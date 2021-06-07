import { v4, validate } from 'uuid';
import v from 'validator';

import {
  Business,
  BusinessInfo,
  BusinessUpdates,
} from '@interfaces/schema/business.interfaces';

import BusinessModel from '@models/Business.model';

class BusinessServices {
  public async create(data: BusinessInfo) {
    if (!v.isEmail(data.mail)) throw 'invalid email';

    const newBusiness = new BusinessModel(data);
    newBusiness.code = v4();

    await newBusiness.save();
    return newBusiness;
  }

  public async get(_id: string) {
    return await BusinessModel.findById(_id);
  }

  public async update(_id: string, updates: BusinessUpdates): Promise<boolean> {
    if (updates.mail && !v.isEmail(updates.mail)) throw 'invalid email';

    await BusinessModel.updateOne({ _id }, updates);
    return false;
  }

  public async delete(_id: string) {
    //TODO: eliminar todo lo que esté anexado a la empresa
    await BusinessModel.deleteOne({ _id });
    return false;
  }

  public async all(page: number) {
    return await BusinessModel.paginate({}, { page, limit: 15, sort: { union: -1 } });
  }

  public async search(name: string, page: number) {
    return await BusinessModel.paginate(
      { name: { $regex: name, $options: 'i' } },
      { page, limit: 15 },
    );
  }

  public async getWithCode(code: string): Promise<Business | null> {
    if (!validate(code)) throw 'invalid code';

    return await BusinessModel.findOne({ code });
  }
}

export default new BusinessServices();
