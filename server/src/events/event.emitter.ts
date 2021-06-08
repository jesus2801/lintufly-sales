import { EventEmitter } from 'events';

import emailServices from '@services/email.services';

// emitter para manejar los eventos de la aplicación
const eventEmmiter = new EventEmitter();

//cuando un usuario se registra, enviarle el correo de verificación
eventEmmiter.on('user_signup', async (email: string, name: string, code: string) => {
  await emailServices.sendSignupEmail(email, name, code);
});

export default eventEmmiter;
