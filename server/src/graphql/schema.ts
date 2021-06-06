import { mergeTypeDefs } from 'graphql-tools';
import { readFileSync } from 'fs';
import { print } from 'graphql';
import path from 'path';

// leo todos los archivos de schemas y luego los uno
export default print(
  mergeTypeDefs([
    readFileSync(path.join(__dirname, '../../schema/business.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, '../../schema/client.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, '../../schema/egress.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, '../../schema/employee.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, '../../schema/income.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, '../../schema/product.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, '../../schema/sale.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, '../../schema/store.graphql'), 'utf-8'),
  ]),
);
