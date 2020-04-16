import {Injectable} from '@angular/core';
import {AppConfig} from '../config/app-config';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) {
  }

  authSuccess(data: any) {
    localStorage.setItem(AppConfig.token, data.data);
    this.userService.initUserInfo();
  }

  removeAuthToken(){
    localStorage.removeItem(AppConfig.user);
    localStorage.removeItem(AppConfig.token);
  }

  getAuthToken() {
    return localStorage.getItem(AppConfig.token);
  }
}
