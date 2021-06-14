import gql from 'graphql-tag';

export default gql`
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
`;
