export default {
  server: {
    clientOrigin: process.env.CLIENT_ORIGIN!,
  },
  db: {
    uri: process.env.MONGO_URI!,
  },
};
