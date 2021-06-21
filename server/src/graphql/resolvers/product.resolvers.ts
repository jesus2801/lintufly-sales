import {
  ProductChangesInput,
  ProductIdInput,
  ProductInput,
} from '@interfaces/schema/product.interfaces';
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
      return await productServices.create(input, user!.businessId);
    },

    async deleteProduct({}, { _id }: ProductIdInput, { user }: GraphqlCtx) {
      return await productServices.delete(_id, user!.businessId);
    },

    async updateProduct({}, { changes, _id }: ProductChangesInput, { user }: GraphqlCtx) {
      return await productServices.update(changes, _id, user!.businessId);
    },
  },
};
