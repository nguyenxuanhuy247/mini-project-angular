export class StoreUserModel {
  constructor(
    public email: string,
    public id: string,
    private _token: string | null,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }

  get userData() {
    return {
      email: this.email,
      id: this.id,
      _token: this.token,
      _tokenExpirationDate: this._tokenExpirationDate,
    };
  }

  checkAdmin() {
    const adminId = 'opMI5bCx5VTfF6eGGEAD4q9mlzv1';

    if (this.id === adminId) {
      return true;
    } else {
      return false;
    }
  }

  getUsername() {
    const parts = this.email.split('@');
    return parts[0];
  }
}

export interface UserReqModel {
  email: string;
  password: string;
}

export interface UserResModel {
  localId: string;
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  kind: string;
  registered?: boolean;
}

export interface UserData {
  email: string;
  id: string;
  _token: string | null;
  _tokenExpirationDate: Date;
}
