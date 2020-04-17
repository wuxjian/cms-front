import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-manage-header',
  templateUrl: './manage-header.component.html',
  styleUrls: ['./manage-header.component.less']
})
export class ManageHeaderComponent implements OnInit {

  @Input()
  drawer;
  user;

  constructor(private _snackBar: MatSnackBar, private router: Router,
              private userService: UserService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.user = this.userService.getUserInfo();
  }

  toggleDrawer() {
    this.drawer.toggle();
  }

  modifyPassword() {
    this._snackBar.open('功能还未实现~', '', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  quit() {
    this.authService.removeAuthToken();
  }

}
