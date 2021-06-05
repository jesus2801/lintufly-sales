import { mergeResolvers } from 'graphql-tools';

//importo todos los resolvers de la aplicación
import businessResolvers from './Business/business.resolvers';
import employeeResolvers from './Employee/employee.resolvers';
import productResolvers from './Product/product.resolvers';
import clientResolvers from './Client/client.resolvers';
import egressResolvers from './Egress/egress.resolvers';
import incomeResolvers from './Income/income.resolvers';
import storeResolvers from './Store/store.resolvers';
import saleResolvers from './Sale/sale.resolvers';

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
