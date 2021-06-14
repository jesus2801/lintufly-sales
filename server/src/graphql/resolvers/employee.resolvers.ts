import { GraphqlCtx } from '@interfaces';
import { EmployeeInput, LoginInput } from '@interfaces/schema/employee.interfaces';

import employeeServices from '@services/employee.services';

export default {
  Query: {
    async viewer({}, {}, ctx: GraphqlCtx) {
      return ctx.reply.user;
    },
  },

  Mutation: {
    async loginEmployee({}, { input: { mail, pass } }: LoginInput) {
      return employeeServices.login(mail, pass);
    },

    async createEmployee({}, { input, key }: EmployeeInput): Promise<boolean> {
      return employeeServices.create(input, key);
    },
  },
};
