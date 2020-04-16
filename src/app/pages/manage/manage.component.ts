import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/app-config';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.less']
})
export class ManageComponent implements OnInit {
  user;
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUserInfo();
    console.log(this.user);
  }

}
