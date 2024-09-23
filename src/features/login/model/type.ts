import { BrowserStorageModel } from 'shared/utils/StorageModel';

export interface LoginFormData {
  email: string;
  password: string;
  keepLoggedIn?: boolean;
}

export class LoginStorageModel extends BrowserStorageModel<
  'login-email' | 'login-token'
> {
  readonly email = 'login-email';
  readonly token = 'login-token';
  constructor() {
    super();
  }
  getEmail() {
    if (typeof window === 'undefined') {
      return null;
    }
    return this.get(this.email);
  }
  setEmail(email: string) {
    this.set(this.email, email);
  }

  getToken() {
    if (typeof window === 'undefined') {
      return null;
    }
    return this.get(this.token);
  }
  setToken(token: string) {
    this.set(this.token, token);
  }
}
