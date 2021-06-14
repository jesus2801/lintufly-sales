import { ProductInput } from '@interfaces/schema/product.interfaces';
import { GraphqlCtx } from '@interfaces';

import productServices from '@services/product.services';

export default {
  Mutation: {
    createProduct({}, { input }: ProductInput, { user }: GraphqlCtx) {
      return productServices.create(input, user!.sub);
    },
  },
};
