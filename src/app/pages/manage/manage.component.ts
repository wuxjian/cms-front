import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/app-config';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.less']
})
export class ManageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getUserInfo(){
    this.http.get(AppConfig.baseUrl + "/userInfo", )
  }

}
