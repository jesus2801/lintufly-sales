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

export interface AppCtx {
  register: RegisterCtx;
}
