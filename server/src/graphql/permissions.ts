import { rule, shield, allow } from 'graphql-shield';

import { ServiceError } from '@utils/handler.errors';

// regla para determinar si un usuario es admin
const isAdmin = rule({ cache: 'contextual' })(
  async ({}, {}, ctx, {}) => ctx.user.role === 'admin',
);

// reglas para todas las consultas y mutaciones
export default shield(
  {
    Query: {
      //businesses
      loginEmployee: allow,
      allBusiness: allow,
      getBusiness: allow,
      searchBusiness: allow,
      getBusinessWithCode: allow,
      //employees
    },
    Mutation: {
      //businesses
      createBusiness: allow,
      updateBusiness: isAdmin,
      deleteBusiness: isAdmin,
      //employees
      createEmployee: allow,
      createStore: isAdmin,
    },
  },
  {
    fallbackError: (t) => {
      if (t instanceof ServiceError) return new Error(t.code);
      console.log(t);
      return new Error('Forbidden');
    },
  },
);
