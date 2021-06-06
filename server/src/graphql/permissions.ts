import { rule, shield, allow } from 'graphql-shield';

const isAdmin = rule({ cache: 'contextual' })(
  async ({}, {}, ctx, {}) => ctx.user.role === 'admin',
);

export default shield({
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
});
