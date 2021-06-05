import { mergeResolvers } from 'graphql-tools';

// import { combineResolvers } from 'src/functions';
import businessResolvers from './Business/business.resolvers';
import clientResolvers from './Client/client.resolvers';
import egressResolvers from './Egress/egress.resolvers';
import employeeResolvers from './Employee/employee.resolvers';
import incomeResolvers from './Income/income.resolvers';
import productResolvers from './Product/product.resolvers';
import saleResolvers from './Sale/sale.resolvers';
import storeResolvers from './Store/store.resolvers';

export default mergeResolvers([
  businessResolvers,
  clientResolvers,
  egressResolvers,
  employeeResolvers,
  incomeResolvers,
  productResolvers,
  saleResolvers,
  storeResolvers,
]);
