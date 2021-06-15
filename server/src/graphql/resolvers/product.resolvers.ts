import { ProductInput } from '@interfaces/schema/product.interfaces';
import { GraphqlCtx } from '@interfaces';

import productServices from '@services/product.services';

export default {
  Query: {
    async getProducts({}, {}, { user }: GraphqlCtx) {
      return await productServices.get(user!.businessId);
    },
  },

  Mutation: {
    async createProduct({}, { input }: ProductInput, { user }: GraphqlCtx) {
      return await productServices.create(input, user!.sub);
    },
  },
};
