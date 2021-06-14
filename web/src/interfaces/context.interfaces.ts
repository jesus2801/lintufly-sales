export interface RegisterCtx {
  businessName: string;
  businessMail: string;
  currency: string;
  phone: string | null;
  images: File[];
  name: string;
  mail: string;
  pass: string;
}

export interface EmployeePayload {
  role: 'admin' | 'employee';
  mail: string;
  name: string;
  sub: string;
  businessId: string;
  businessName: string;
  storeId: string;
  storeName: string;
  avatar: string;
}

export interface EmployeeCtx {
  payload: null | EmployeePayload;
}

export interface AppCtx {
  register: RegisterCtx;
  employee: EmployeeCtx;
}
