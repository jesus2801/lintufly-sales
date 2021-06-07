import { PaginateResults } from '@interfaces/schema';
import {
  Business,
  BusinessInput,
  CodeInterface,
  IdInput,
  NameInput,
  PaginateInput,
  UpdateBusinessInput,
} from '@interfaces/schema/business.interfaces';
import businessServices from '@services/business.services';

export default {
  Query: {
    allBusiness: async ({}, { page }: PaginateInput): Promise<PaginateResults<Business>> => {
      return await businessServices.all(page);
    },

    getBusiness: async ({}, { _id }: IdInput): Promise<Business | null> => {
      return await businessServices.get(_id);
    },

    getBusinessWithCode: async ({}, { code }: CodeInterface): Promise<Business | null> => {
      return await businessServices.getWithCode(code);
    },

    searchBusiness: async (
      {},
      { input: { name, page } }: NameInput,
    ): Promise<PaginateResults<Business>> => {
      return await businessServices.search(name, page);
    },
  },

  Mutation: {
    createBusiness: async ({}, { input }: BusinessInput): Promise<Business> => {
      return await businessServices.create(input);
    },

    updateBusiness: async (
      {},
      { input: { _id, updates } }: UpdateBusinessInput,
    ): Promise<boolean> => {
      return await businessServices.update(_id, updates);
    },

    deleteBusiness: async ({}, { _id }: IdInput): Promise<boolean> => {
      return await businessServices.delete(_id);
    },
  },
};
