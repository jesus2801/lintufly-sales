import { PaginateResults } from '@interfaces/schema';
import BusinessModel from '@models/Business';
import {
  Business,
  BusinessInput,
  IdInput,
  NameInput,
  PaginateInput,
  UpdateBusinessInput,
} from '@interfaces/schema/business';

export default {
  Query: {
    allBusiness: async (
      _: any,
      { page }: PaginateInput,
    ): Promise<PaginateResults<Business>> => {
      return await BusinessModel.paginate({}, { page, limit: 15 });
    },

    getBusiness: async (_: any, { _id }: IdInput): Promise<Business | null> => {
      return await BusinessModel.findById(_id);
    },

    searchBusiness: async (
      _: any,
      { input: { name, page } }: NameInput,
    ): Promise<PaginateResults<Business>> => {
      return await BusinessModel.paginate(
        { name: { $regex: name, $options: 'i' } },
        { page, limit: 15 },
      );
    },
  },

  Mutation: {
    createBusiness: async (_: any, { input }: BusinessInput): Promise<Business> => {
      const newBusiness = new BusinessModel(input);
      await newBusiness.save();
      return newBusiness;
    },

    updateBusiness: async (
      _: any,
      { input: { _id, updates } }: UpdateBusinessInput,
    ): Promise<boolean> => {
      await BusinessModel.updateOne({ _id: _id }, updates);
      return false;
    },

    deleteBusiness: async (_: any, { _id }: IdInput): Promise<boolean> => {
      //TODO: eliminar todo lo que esté anexado a la empresa
      await BusinessModel.deleteOne({ _id });
      return false;
    },
  },
};
