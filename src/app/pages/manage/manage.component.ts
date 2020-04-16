import {Component, OnInit} from '@angular/core';
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
  }

}
