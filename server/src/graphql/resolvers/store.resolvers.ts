import { StoreDoc, StoreInput } from '@interfaces/schema/store.interfaces';

import storeServices from '@services/store.services';

export default {
  Mutation: {
    async createStore({}, { input }: StoreInput): Promise<StoreDoc> {
      return await storeServices.create(input);
    },
  },
};
