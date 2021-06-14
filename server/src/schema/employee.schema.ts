import gql from 'graphql-tag';

export default gql`
  type Query {
    viewer: TokenPayload!
    "Loguear un empleado de una empresa"
    loginEmployee(input: LoginInput!): String!
  }

  type Mutation {
    "Crear un nuevo empleado de una empresa"
    createEmployee(input: EmployeeInput!, key: String!): Boolean!
  }

  "Información necesaria para el logueo de un empleado"
  input LoginInput {
    "Correo electronico del empleado"
    mail: String!
    "Contraseña del empleado"
    pass: String!
  }

  "Roles de los empleados"
  enum EmployeeRoles {
    admin
    employee
  }

  type TokenPayload {
    role: EmployeeRoles!
    "Id del usuario"
    sub: ID!
    "Email del usuario"
    mail: String!
    "Nombre del usuario"
    name: String!
    "Id de la empresa a la que pertenece el usuario"
    businessId: ID!
    "Nombre de la empresa a la que pertenece el usuario"
    businessName: String!
    "Id de la tienda o local a la que pertenece el usuario"
    storeId: ID
    "Nombre de la tienda o local a la que pertenece el usuario"
    storeName: String
    "avatar del usuario"
    avatar: String!
  }

  "Información necesaria para crear un empleado"
  input EmployeeInput {
    "Nombre del empleado"
    name: String!
    "Id de la empresa del empleado"
    business: ID!
    "Id de la tienda del empleado"
    store: ID
    "Correo electronico del empleado"
    mail: String!
    "Contraseña del empleado"
    pass: String!
  }
`;
