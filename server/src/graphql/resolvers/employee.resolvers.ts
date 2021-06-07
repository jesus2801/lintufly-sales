import { EmployeeInput, LoginInput } from '@interfaces/schema/employee.interfaces';

import employeeServices from '@services/employee.services';

export default {
  Query: {
    async loginEmployee({}, { input: { mail, pass } }: LoginInput): Promise<string> {
      return employeeServices.login(mail, pass);
    },
  },

  Mutation: {
    async createEmployee({}, { input, key }: EmployeeInput): Promise<boolean> {
      return employeeServices.create(input, key);
    },
  },
};
