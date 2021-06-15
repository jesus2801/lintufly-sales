import gql from 'graphql-tag';

export default gql`
  type Query {
    getProducts: [CompleteProduct!]!
  }

  type Mutation {
    "Crear un nuevo producto para la empresa"
    createProduct(input: ProductInput): ID!
  }

  "Input a introducir cuando se crea un producto"
  input ProductInput {
    "Nombre del producto"
    name: String!
    "Precio del producto acorde a la moneda de la empresa"
    price: Float!
    "imagenes del producto"
    imgs: [String!]!
    "Descripción del producto"
    desc: String
  }

  type CompleteProduct {
    "Id del producto"
    _id: ID!
    "Nombre del producto"
    name: String!
    "Precio del producto acorde a la moneda de la empresa"
    price: Float!
    "imagenes del producto"
    imgs: [String!]!
    "Descripción del producto"
    desc: String
    "Empresa a la que pertenece el producto"
    business: ID!
    "Comentario u opiniones del producto"
    comments: [String!]!
  }
`;
