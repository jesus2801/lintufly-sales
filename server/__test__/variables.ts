import request from 'supertest';

export const serverRute = 'http://localhost:3004';
export const q = async (query: string) =>
  await request(serverRute).post('/graphql').send({
    query,
    variables: null,
  });
