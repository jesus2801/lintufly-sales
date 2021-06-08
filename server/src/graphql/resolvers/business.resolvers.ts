import { PaginateResults } from '@interfaces/schema';
import {
  BusinessInput,
  CodeInterface,
  IdInput,
  NameInput,
  PaginateInput,
  UpdateBusinessInput,
} from '@interfaces/schema/business.interfaces';

import businessServices from '@services/business.services';

import type { IBusiness } from '@models/Business.model';

export default {
  Query: {
    allBusiness: async (
      {},
      { page }: PaginateInput,
    ): Promise<PaginateResults<IBusiness>> => {
      return await businessServices.all(page);
    },

    getBusiness: async ({}, { _id }: IdInput): Promise<IBusiness | null> => {
      return await businessServices.get(_id);
    },

    getBusinessWithCode: async (
      {},
      { code }: CodeInterface,
    ): Promise<IBusiness | null> => {
      return await businessServices.getWithCode(code);
    },

    searchBusiness: async (
      {},
      { input: { name, page } }: NameInput,
    ): Promise<PaginateResults<IBusiness>> => {
      return await businessServices.search(name, page);
    },
  },

  Mutation: {
    createBusiness: async ({}, { business, admin }: BusinessInput): Promise<boolean> => {
      return await businessServices.create(business, admin);
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
