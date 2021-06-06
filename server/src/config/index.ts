//configuración de todo el servidor
export default {
  server: {
    clientOrigin: process.env.CLIENT_ORIGIN!,
    secret: process.env.SECRET_KEY!
  },
  db: {
    uri: process.env.MONGO_URI!,
  },
};
