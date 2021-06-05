import {
  BusinessInput,
  IdInput,
  NameInput,
  PaginateInput,
  UpdateBusinessInput,
} from 'src/interfaces/schema/business';
import Business from 'src/models/Business';

export default {
  Query: {
    allBusiness: async (_: any, { page }: PaginateInput) => {
      return await Business.paginate({}, { page, limit: 15 });
    },

    getBusiness: async (_: any, { _id }: IdInput) => {
      return await Business.findById(_id);
    },

    searchBusiness: async (_: any, { input: { name, page } }: NameInput) => {
      return await Business.paginate(
        { name: { $regex: name, $options: 'i' } },
        { page, limit: 15 },
      );
    },
  },

  Mutation: {
    createBusiness: async (_: any, { input }: BusinessInput) => {
      const newBusiness = new Business(input);
      await newBusiness.save();
      return newBusiness;
    },

    updateBusiness: async (_: any, { input: { _id, updates } }: UpdateBusinessInput) => {
      await Business.updateOne({ _id: _id }, updates);
      return false;
    },

    deleteBusiness: async (_: any, { _id }: IdInput) => {
      await Business.deleteOne({ _id });
      return false;
    },
  },
};
