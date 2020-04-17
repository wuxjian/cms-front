import {Injectable} from '@angular/core';
import {AppConfig} from '../config/app-config';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService, private router: Router) {
  }

  async authSuccess(data: any) {
    localStorage.setItem(AppConfig.token, data.data);
    await this.userService.initUserInfo();
  }

  removeAuthToken(){
    localStorage.removeItem(AppConfig.user);
    localStorage.removeItem(AppConfig.token);
    this.router.navigate(['/login']);
  }

  getAuthToken() {
    return localStorage.getItem(AppConfig.token);
  }
}
