import Swal from 'sweetalert2';

export const showErr = (message: string) => {
  Swal.fire('¡Error!', message, 'error');
};

export const success = (message: string, onClose?: () => void) => {
  Swal.fire({
    title: '¡Yuhuu!',
    text: message,
    icon: 'success',
    didClose: onClose,
  });
};

export const handleLoading = (state: boolean, title?: string) => {
  if (state) {
    Swal.fire({
      title: title || 'Cargando',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    return;
  }

  Swal.close();
};
