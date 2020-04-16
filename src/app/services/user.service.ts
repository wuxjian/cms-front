import { Injectable } from '@angular/core';
import {AppConfig} from '../config/app-config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  initUserInfo(){
    this.http.post(AppConfig.baseUrl + '/userInfo', null).toPromise().then((data: any) => {
      localStorage.setItem(AppConfig.user, JSON.stringify(data.data));
    });
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem(AppConfig.user));
  }

}
