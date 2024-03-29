import gql from 'graphql-tag';

export default gql`
  type Mutation {
    "Crear una nueva tienda o local"
    createStore(input: StoreInput): Store
  }

  "Información para crear una nueva tienda o local"
  input StoreInput {
    "Nombre de la tienda o local"
    name: String!
    "Empresa a la que pertenece la tienda o local"
    business: ID!
    "Dirección de la tienda o local"
    dir: String
    "descripción de la tienda o local"
    desc: String
  }

  "Tienda o local en la plataforma"
  type Store {
    "Id de la tienda o local"
    _id: ID!
    "Nombre de la tienda o local"
    name: String!
    "Id de la empresa a la que pertenece"
    business: ID!
    "Dirección de la tienda o local"
    dir: String
    "Descripción de la tienda o local"
    desc: String
  }
`;
