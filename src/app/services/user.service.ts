import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _hasLogin = false;

  constructor() {
  }

  get hasLogin() {
    return this._hasLogin;
  }

  set hasLogin(login) {
    this._hasLogin = login;
  }

}
