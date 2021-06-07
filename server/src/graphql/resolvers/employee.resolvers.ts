import { EmployeeInput } from '@interfaces/schema/employee.interfaces';

import employeeServices from '@services/employee.services';

export default {
  Mutation: {
    async loginEmployee({}) {
      return '';
    },

    async createEmployee({}, { input, key }: EmployeeInput) {
      return employeeServices.create(input, key);
    },
  },
};
