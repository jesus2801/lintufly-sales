import { StoreInput } from '@interfaces/schema/store.interfaces';
import { IStore } from '@models/Store.model';

import storeServices from '@services/store.services';

export default {
  Mutation: {
    async createStore({}, { input }: StoreInput): Promise<IStore> {
      return await storeServices.create(input);
    },
  },
};
