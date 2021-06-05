export interface IdInput {
  _id: string;
}

export interface PaginateInput {
  page: number;
}

export interface NameInput {
  input: {
    page: number;
    name: string;
  };
}

export interface UpdateBusinessInput {
  input: {
    _id: string;
    updates: {
      name?: string;
      mail?: string;
      state?: boolean;
      currency?: string;
      phones?: string[];
      union?: number;
    };
  };
}

export interface BusinessInput {
  input: {
    name: string;
    mail: string;
    state: boolean;
    currency: string;
    phones: string[];
    union: number;
  };
}
