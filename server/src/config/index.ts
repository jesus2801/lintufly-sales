//configuración de todo el servidor
export default {
  server: {
    clientOrigin: process.env.CLIENT_ORIGIN!,
    secret: process.env.SECRET_KEY!,
    rollbar: {
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN!,
    },
    recaptchaKey: process.env.RECAPTCHA_KEY!,
  },
  db: {
    uri: process.env.MONGO_URI!,
  },
};
