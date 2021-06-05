import { readFileSync } from 'fs';
import path from 'path';
// import { combineSchemas } from 'src/functions';
import { mergeTypeDefs } from 'graphql-tools';
import { print } from 'graphql';

export default print(
  mergeTypeDefs([
    readFileSync(path.join(__dirname, './Business/schema.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, './Client/schema.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, './Egress/schema.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, './Employee/schema.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, './Income/schema.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, './Product/schema.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, './Sale/schema.graphql'), 'utf-8'),
    readFileSync(path.join(__dirname, './Store/schema.graphql'), 'utf-8'),
  ]),
);
