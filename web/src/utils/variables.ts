export const preferredCountries = [
  'co',
  'ar',
  'bo',
  'cl',
  'cr',
  'cu',
  'do',
  'ec',
  'sv',
  'es',
  'gt',
  'gq',
  'hn',
  'mx',
  'ni',
  'pa',
  'py',
  'pe',
  'pr',
  'uy',
  've',
];

//cache para las imágenes
export const cacheTag = 'public, max-age=31536000';

//Formatos de imagen aceptados
export const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export const navWidth = '300px';

const baseUrl = '/static/nav/';
export const navItems = [
  {
    name: 'Gestor de pedidos',
    items: [
      { name: 'Lista de pedidos', img: `${baseUrl}task-list.webp`, link: 'orders/' },
      {
        name: 'Agendar pedido',
        img: `${baseUrl}notebook.webp`,
        link: 'orders/create-order',
      },
    ],
  },
  {
    name: 'Gestor de Estadisticas',
    items: [],
  },
  {
    name: 'Gestor de Empleados y Locales',
    items: [
      {
        name: 'Lista de Locales',
        img: `${baseUrl}store.webp`,
        link: '/stores/',
      },
      {
        name: 'Agregar Local',
        img: `${baseUrl}notebook.webp`,
        link: '/stores/create-store',
      },
      {
        name: 'Lista de Empleados',
        img: `${baseUrl}employee.webp`,
        link: '/employees/',
      },
      {
        name: 'Agregar empleado',
        img: `${baseUrl}notebook.webp`,
        link: '/employees/create-employee',
      },
    ],
  },
  {
    name: 'Gestor de Productos',
    items: [
      {
        name: 'Lista de Productos',
        img: `${baseUrl}shopping-cart.webp`,
        link: 'products/',
      },
      {
        name: 'Agregar Producto',
        img: `${baseUrl}notebook.webp`,
        link: 'products/create-product',
      },
    ],
  },
  {
    name: 'Gestor de Egresos',
    items: [
      { name: 'Lista de egresos', img: `${baseUrl}money.webp`, link: '/egress/' },
      {
        name: 'Agendar egreso',
        img: `${baseUrl}notebook.webp`,
        link: '/egress/create-egress',
      },
    ],
  },
  {
    name: 'Gestor de Ingresos',
    items: [
      { name: 'Lista de Ingresos', img: `${baseUrl}money.webp`, link: '/income/' },
      {
        name: 'Agendar Ingreso',
        img: `${baseUrl}notebook.webp`,
        link: '/egress/create-income',
      },
    ],
  },
];
