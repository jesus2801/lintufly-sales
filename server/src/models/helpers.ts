import { firebaseInstance } from '@config/firebase.config';

import { handlerErrors } from '@utils/handler.errors';

import ProductModel, { IProduct } from './Product.model';
import EmployeeModel from './Employee.model';
import IncomeModel from './Income.model';
import EgressModel from './Egress.model';
import StoreModel from './Store.model';
import SaleModel from './Sale.model';

export const deleteBusinessRelations = (_id: string) => {
  const q = { business: _id };

  EmployeeModel.remove(q).catch(handlerErrors);
  ProductModel.remove(q).catch(handlerErrors);
  IncomeModel.remove(q).catch(handlerErrors);
  EgressModel.remove(q).catch(handlerErrors);
  StoreModel.remove(q).catch(handlerErrors);
  SaleModel.remove(q).catch(handlerErrors);
};

export const deleteProductImages = (imgs: string[]) => {
  imgs.forEach((img: string) => {
    firebaseInstance.bucket
      .file(img, {})
      .delete({ ignoreNotFound: true })
      .catch(handlerErrors);
  });
};
