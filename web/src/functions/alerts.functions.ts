import Swal from 'sweetalert2';

export const showErr = (message: string) => {
  Swal.fire('¡Error!', message, 'error');
};
