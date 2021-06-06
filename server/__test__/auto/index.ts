import prompts from 'prompts';
import { main as business } from './business';
import { main as pulse } from './pulse';

const init = async () => {
  const response = await prompts({
    type: 'multiselect',
    name: 'Test',
    message: 'Selecciona un test para iniciar',
    choices: [
      { title: 'Get Pulse of server', value: 'pulse' },
      { title: 'Business test', value: 'business' },
    ],
    min: 1,
    max: 1,
  });

  switch (response.Test[0]) {
    case 'pulse':
      await pulse();
      init();
      break;

    case 'business':
      await business();
      init();
      break;

    default:
      console.log('Opción desconocida');
      break;
  }
};

init();
