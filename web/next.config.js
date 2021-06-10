const nextBuildId = require('next-build-id');

module.exports = {
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  trailingSlash: true,
  env: {
    RECAPTCHA_SITE_KEY: '6LdMNyIbAAAAAFj16UUX7jB8LshqmnZ8Q3loCR9I',
    SERVER_URI: 'http://localhost:3004/graphql',
  },
};
