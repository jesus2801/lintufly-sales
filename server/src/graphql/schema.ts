import { mergeTypeDefs } from 'graphql-tools';
import { print } from 'graphql';

import business from '@schema/business.schema';
// import client from '@schema/client.schema';
// import egress from '@schema/egress.schema';
import employee from '@schema/employee.schema';
// import income from '@schema/income.schema';
import product from '@schema/product.schema';
// import sale from '@schema/sale.schema';
import store from '@schema/store.schema';

// leo todos los archivos de schemas y luego los uno
export default print(mergeTypeDefs([business, product, employee, store]));
