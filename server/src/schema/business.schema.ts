import gql from 'graphql-tag';

export default gql`
  type Query {
    "Obtener todas las empresas de la plataforma de manera paginada"
    allBusiness(page: Int!): AllBusinessResponse!
    "Obtener una empresa por su id"
    getBusiness(_id: ID!): Business
    "Obtener una empresa por su código"
    getBusinessWithCode(code: String!): Business
    "Buscar empresas por un nombre ingresado y de manera paginada"
    searchBusiness(input: SearchBusinessInput!): AllBusinessResponse!
  }

  type Mutation {
    "Crear una nueva empresa dentro de la plataforma"
    createBusiness(
      business: BusinessInput!
      admin: AdminInput!
      recaptcha: String!
    ): Boolean!
    "Actualizar la información de una empresa"
    updateBusiness(input: UpdateBusiness!): Boolean!
    "Eliminar una empresa de la plataforma"
    deleteBusiness(_id: ID!): Boolean!
  }

  "Input de la información del administrador de la empresa a crear"
  input AdminInput {
    "Nombre real del administrador"
    name: String!
    "Correo electronico del administrador"
    mail: String!
    "Contraseña del administrador"
    pass: String!
  }

  "Input para buscar una empresa"
  input SearchBusinessInput {
    "Nombre de la empresa a buscar"
    name: String!
    "Página que se quiere recibir de la búsqueda"
    page: Int!
  }

  "Respuesta después de pedir todas las empresas"
  type AllBusinessResponse {
    "Documentos que almacenan a las empresas"
    docs: [Business!]!
    "Total de documentos disponibles en la base de datos"
    totalDocs: Int!
    "Límite de documentos por página establecido"
    limit: Int!
    "Página actual de las respuestas"
    page: Int
    "Total de páginas posibles de las respuestas"
    totalPages: Int!
    "Variable que determina si hay una nueva página"
    hasNextPage: Boolean!
    "Número de la siguiente página"
    nextPage: Int
    "Variable que determina si hay una página previa"
    hasPrevPage: Boolean!
    "Número de la página previa"
    prevPage: Int
    "Contador de la página actual"
    pagingCounter: Int!
  }

  "Input necesario para actualizar una empresa"
  input UpdateBusiness {
    "Id de la empresa a actualizar"
    _id: ID!
    "Campos a actualizar de la empresa"
    updates: BusinessUpdates!
  }

  "Campos que se pueden actualizar dentro de una empresa"
  input BusinessUpdates {
    "Nombre de la empresa"
    name: String
    "Correo electronico de la empresa"
    mail: String
    "Moneda que maneja la empresa"
    currency: String
    "Teléfonos de la empresa"
    phones: [String!]
    "Imagenes de la empresa (Imágenes de su local, productos, marca, etc.)"
    imgs: [String!]
  }

  "Información para crear una nueva empresa"
  input BusinessInput {
    "nombre de la empresa"
    name: String!
    "Correo electronico de la empresa"
    mail: String!
    "Moneda que maneja la empresa"
    currency: String!
    "Telefonos de la empresa"
    phones: [String!]!
    "Imagenes de la empresa (Imágenes de su local, productos, marca, etc.)"
    imgs: [String!]!
  }

  "Información de una empresa en la plataforma"
  type Business {
    "Id de la empresa"
    _id: ID!
    "Nombre de la empresa"
    name: String!
    "Correo electronico de la empresa"
    mail: String!
    "Moneda que maneja la empresa"
    currency: String!
    "Telefonos de la empresa"
    phones: [String!]!
    "Fecha de unión de la empresa (en milisegundos)"
    union: Float!
    "Imagenes de la empresa (Imágenes de su local, productos, marca, etc.)"
    imgs: [String!]!
  }
`;
