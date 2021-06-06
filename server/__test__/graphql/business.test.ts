import { Business } from '@interfaces/schema/business';
import request from 'supertest';
import { q, serverRute } from '../variables';

const add = `
mutation {
  createBusiness(input: {
   name: "Prueba"
   mail: "prueba@gmail.com"
   state: true
   currency: "COP"
   phones: ["+57 3052743992"]
   union: 1622945552428
   imgs: []
 }) {
   _id
 }
}
`;

const getAll = `
{
  allBusiness(page: 1) {
    docs {
      _id
    }
  }
}
`;

export const getOne = (id: string) => `
{
  getBusiness(_id: "${id}") {
    _id
  }
}
`;

export const search = `
{
  searchBusiness(input: {
    name: "Prueba"
    page: 1
  }) {
    docs {
      _id
    }
  }
}
`;

const deleteBusiness = (id: string) => `
mutation {
  deleteBusiness(_id: "${id}")
}
`;

describe('Business tests', () => {
  it('Do all actions of the company', async (done) => {
    const addResults = await request(serverRute).post('/graphql').send(q(add));
    expect(addResults.statusCode).toBe(200);
    const companyId = addResults.body.data.createBusiness._id;
    expect(typeof companyId).toBe('string');

    const allResults = await request(serverRute).post('/graphql').send(q(getAll));
    expect(allResults.statusCode).toBe(200);
    const allDocs: Business[] = allResults.body.allBusiness.docs;
    expect(allDocs.length).toBeGreaterThan(0);
    expect(allDocs.some((doc) => doc._id === companyId)).toBe(true);

    const getOneResults = await request(serverRute)
      .post('/graphql')
      .send(q(getOne(companyId)));
    expect(getOneResults.statusCode).toBe(200);
    expect(getOneResults.body.data.getBusiness._id).toBe(companyId);

    const searchResults = await request(serverRute).post('/graphql').send(q(search));
    expect(searchResults.statusCode).toBe(200);
    const searchDocs = searchResults.body.data.getBusiness.

    done();
  });
});
