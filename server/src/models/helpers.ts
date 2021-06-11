import { handlerErrors } from '@utils/handler.errors';

import { IBusiness } from './Business.model';
import EmployeeModel from './Employee.model';
import ProductModel from './Product.model';
import IncomeModel from './Income.model';
import EgressModel from './Egress.model';
import StoreModel from './Store.model';
import SaleModel from './Sale.model';

export const deleteBusinessRelations = (doc: IBusiness, next: () => void) => {
  const q = { business: doc._id };

  EmployeeModel.remove(q).catch(handlerErrors);
  ProductModel.remove(q).catch(handlerErrors);
  IncomeModel.remove(q).catch(handlerErrors);
  EgressModel.remove(q).catch(handlerErrors);
  StoreModel.remove(q).catch(handlerErrors);
  SaleModel.remove(q).catch(handlerErrors);
  next();
};
