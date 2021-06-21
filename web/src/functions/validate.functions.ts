import errorCodes from '@utils/error.codes';

import { showErr } from './alerts.functions';

const tryAgain = ', por favor, intente de nuevo o más tarde';

export const switchErrorCode = (errCode: string): string => {
  switch (errCode) {
    case errorCodes.duplicate.businessMail:
      return 'El email de la empresa ingresado, ya está utilizado por otra empresa';

    case errorCodes.duplicate.businessName:
      return 'El nombre de la empresa ingresado, ya está utilizado por otra empresa';

    case errorCodes.duplicate.employeeMail:
      return 'El email ingresado ya se encuentra en uso por otro usuario';

    case errorCodes.invalidCode:
      return 'El código de unión ingresado es inválido' + tryAgain;

    case errorCodes.invalidCredentials:
      return 'Lo sentimos, correo y/o contraseña incorrectos' + tryAgain;

    case errorCodes.invalidEmail:
      return 'El email ingresado tiene un formato inválido';

    case errorCodes.invalidPass:
      return 'La contraseña ingresada debe de cumplir con al menos 6 carácteres';

    case errorCodes.invalidRecaptcha:
      return 'El checkeo de "No soy un robot", es inválido o está caducado' + tryAgain;

    case errorCodes.noBusinessImgs:
      return 'Para crear una empresa se requiere subir al menos una imagen de la misma';

    case errorCodes.noBusinessPhone:
      return 'Es necesario ingresar el número telefónico de la empresa';

    case errorCodes.nonExistentBusiness:
      return 'La empresa que ha tratado de buscar no existe o no se encuentra disponible';

    case errorCodes.businessInactive:
      return 'Lo sentimos, la empresa a la que se intenta acceder está inactiva, esto puede ser porque se acaba de registrar y no nos hemos contactado, o por alguna conducta que viole nuestras normativas';

    case errorCodes.employeeInactive:
      return 'El empleado con el que intenta acceder se encuentra en estado desactivado, esto puede ser porque los administradores de su empresa así lo decidieron o por alguna conducta que viole nuestras normativas';

    case errorCodes.employeeDontHaveBusiness:
      return 'Lo sentimos, el empleado con el que intenta acceder parece no estar anexado a ninguna empresa, este error ya ha sido reportado a nosotros, pronto nos comunicaremos con tu empresa';

    case errorCodes.productNonFoundOnDelete:
      return 'Lo sentimos, el producto que intenta eliminar ya ha sido eliminado por otro individuo';

    case 'Forbidden':
      return 'No tienes credenciales o se han agotado, por favor, logueate para continuar';

    default:
      return 'Lo sentimos, ha ocurrido un error inesperado, por favor, intenta más tarde';
  }
};

export const handlerRequestErr = (e: any) => {
  //si hay un código de graphql, mostramos su error correspondiente
  if (
    e.ServerError &&
    e.ServerError.result &&
    e.ServerError.result.errors &&
    e.ServerError.result.errors[0] &&
    e.ServerError.result.errors[0].message
  ) {
    showErr(switchErrorCode(e.ServerError.result.errors[0].message));
    return;
  }

  if (
    e.networkError &&
    e.networkError.result &&
    e.networkError.result.errors &&
    e.networkError.result.errors[0] &&
    e.networkError.result.errors[0].message
  ) {
    showErr(switchErrorCode(e.networkError.result.errors[0].message));
    return;
  }

  //si el error es desconocido, mostramos este mensaje
  showErr('Lo sentimos, ha ocurrido un error inesperado, por favor intenta más tarde');
};

export const isEmpty = (...strs: string[]) => strs.some((str) => str.trim() === '');
