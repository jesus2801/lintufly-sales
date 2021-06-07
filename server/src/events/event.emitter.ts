import { EventEmitter } from 'events';

import emailServices from '@services/email.services';

const eventEmmiter = new EventEmitter();

eventEmmiter.on('user_signup', async (email: string, name: string, code: string) => {
  await emailServices.sendSignupEmail(email, name, code);
});

export default eventEmmiter;
