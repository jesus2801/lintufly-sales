import autocannon from 'autocannon';

const body = {
  query:
    'query {\n allBusiness(page: 1) {\n docs {\n _id\n }\n totalDocs\n limit\n page\n totalPages\n nextPage\n page\n }\n}',
  variables: null,
};

export const main = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const instance = autocannon(
      {
        url: 'http://localhost:3004/graphql',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      },
      console.log,
    );

    instance.on('done', () => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
    instance.on('error', (e) => {
      reject(e);
    });

    autocannon.track(instance, { renderProgressBar: true });
  });
};
