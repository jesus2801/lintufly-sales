import { mergeResolvers } from 'graphql-tools';

//importo todos los resolvers de la aplicación
import businessResolvers from './business.resolvers';
import employeeResolvers from './employee.resolvers';
import productResolvers from './product.resolvers';
import clientResolvers from './client.resolvers';
import egressResolvers from './egress.resolvers';
import incomeResolvers from './income.resolvers';
import storeResolvers from './store.resolvers';
import saleResolvers from './sale.resolvers';

// hago un merge a todos los resolvers y los exporto
export default mergeResolvers([
  employeeResolvers,
  businessResolvers,
  productResolvers,
  clientResolvers,
  egressResolvers,
  incomeResolvers,
  saleResolvers,
  storeResolvers,
]);
