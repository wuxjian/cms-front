import {Injectable} from '@angular/core';
import {AppConfig} from '../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  authSuccess(data: any) {
    localStorage.setItem(AppConfig.token, data.data);
  }

  getAuthToken() {
    return localStorage.getItem(AppConfig.token);
  }
}
