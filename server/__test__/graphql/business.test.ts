import { Business } from '@interfaces/schema/business';
import { q } from '../variables';

const add = `
mutation {
  createBusiness(input: {
   name: "Prueba"
   mail: "emialdeprueba@gmail.com"
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

const getOne = (id: string) => `
{
  getBusiness(_id: "${id}") {
    _id
  }
}
`;

const search = `
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

const updateBusiness = (id: string) => `
mutation {
  updateBusiness(input: {
    _id: "${id}"
    updates: {
      name: "Prueba Cambiada"
    }
  }) 
}
`;

const deleteBusiness = (id: string) => `
mutation {
  deleteBusiness(_id: "${id}")
}
`;

describe('Business tests', () => {
  it('Do all actions of the company', async () => {
    //ingresar una nueva empresa
    const addResults = await q(add);
    expect(addResults.statusCode).toBe(200);
    const companyId = addResults.body.data.createBusiness._id;
    expect(typeof companyId).toBe('string');

    //obtener todas las empresas
    const allResults = await q(getAll);
    expect(allResults.statusCode).toBe(200);
    const allDocs: Business[] = allResults.body.data.allBusiness.docs;
    expect(allDocs.length).toBeGreaterThan(0);
    expect(allDocs.some((doc) => doc._id === companyId)).toBe(true);

    //Buscar el documento por su id
    const getOneResults = await q(getOne(companyId));
    expect(getOneResults.statusCode).toBe(200);
    expect(getOneResults.body.data.getBusiness._id).toBe(companyId);

    //Buscar documentos que coincidan con el nombre ingresado
    const searchResults = await q(search);
    expect(searchResults.statusCode).toBe(200);

    const searchDocs: Business[] = searchResults.body.data.searchBusiness.docs;
    expect(searchDocs.length).toBeGreaterThan(0);
    expect(searchDocs.some((doc) => doc._id === companyId)).toBe(true);

    //actualizar documento
    const updateResults = await q(updateBusiness(companyId));
    expect(updateResults.statusCode).toBe(200);

    //eliminar la empresa
    const deleteResults = await q(deleteBusiness(companyId));
    expect(deleteResults.statusCode).toBe(200);
  });
});
