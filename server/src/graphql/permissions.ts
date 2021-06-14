import { rule, shield, allow } from 'graphql-shield';

import { handlerErrors, ServiceError } from '@utils/handler.errors';
import { GraphQLError } from 'graphql';

// regla para determinar si un usuario es admin
const isAdmin = rule({ cache: 'contextual' })(
  async ({}, {}, ctx, {}) => ctx.user.role === 'admin',
);

//regla para determinar si está autenticado
const isAuthenticate = rule({ cache: 'contextual' })(
  async ({}, {}, ctx, {}) => ctx.user !== null,
);

// reglas para todas las consultas y mutaciones
export default shield(
  {
    Query: {
      //businesses
      allBusiness: allow,
      getBusiness: allow,
      searchBusiness: allow,
      getBusinessWithCode: allow,
      //employees
      viewer: isAuthenticate,
    },
    Mutation: {
      //businesses
      createBusiness: allow,
      updateBusiness: isAdmin,
      deleteBusiness: isAdmin,
      //employees
      createEmployee: allow,
      createStore: isAdmin,
      loginEmployee: allow,
      //products
      createProduct: isAdmin,
    },
  },
  {
    //fallback que se ejecuta cuando hay errores
    fallbackError: (e: any) => {
      //si el errors es simplemente un error de los servicios, entonces retornamos el código
      if (e instanceof ServiceError) return new Error(e.code);

      if (e instanceof Error) {
        handlerErrors(e);
        //si el error es desconocido, entonces retornamos un graphql error
        return new GraphQLError('Internal server error');
      }

      //el error por defecto significa que el usuario no tiene permisos
      return new Error('Forbidden');
    },
  },
);
