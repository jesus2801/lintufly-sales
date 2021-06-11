import { EventEmitter } from 'events';

import emailServices from '@services/email.services';
import { IEmployee } from '@models/Employee.model';

// emitter para manejar los eventos de la aplicación
const eventEmmiter = new EventEmitter();

//cuando un usuario se registra, enviarle el correo de verificación
eventEmmiter.on('user_signup', async (email: string, name: string, code: string) => {
  await emailServices.sendSignupEmail(email, name, code);
});

eventEmmiter.on('employee_dont_have_business', (employee: IEmployee) => {
  //TODO: reportar este error al sistema de analítica de la aplicación
});

export default eventEmmiter;
