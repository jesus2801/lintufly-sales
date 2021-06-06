import autocannon from 'autocannon';

export const main = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const instance = autocannon(
      {
        url: 'http://localhost:3004',
        method: 'GET',
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
