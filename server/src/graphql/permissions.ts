import { rule, shield, allow } from 'graphql-shield';

//regla para determinar si un usuario es admin
const isAdmin = rule({ cache: 'contextual' })(
  async ({}, {}, ctx, {}) => ctx.user.role === 'admin',
);

//reglas para todas las consultas y mutaciones
export default shield(
  {
    Query: {
      allBusiness: allow,
      getBusiness: allow,
      searchBusiness: allow,
    },
    Mutation: {
      createBusiness: allow,
      updateBusiness: isAdmin,
      deleteBusiness: isAdmin,
    },
  },
  {
    fallbackError: 'Forbidden',
  },
);
