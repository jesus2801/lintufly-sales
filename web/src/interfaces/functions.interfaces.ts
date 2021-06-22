export interface ValidateImageFileOpts {
  generateUrl?: boolean;
}

export type ValidateImageFileResponse =
  | {
      isValid: false;
    }
  | {
      isValid: true;
      url?: string;
    };
