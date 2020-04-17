import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppConfig} from '../../config/app-config';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient,
              private authService: AuthService, private router: Router,
              private _snackBar: MatSnackBar, private userService: UserService) {
  }

  hide = true;

  loginForm = this.fb.group({
    username: new FormControl('', Validators.required),
    password: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    const baseUrl = AppConfig.baseUrl;
    this.http.post<any>(`${baseUrl}/login`, this.loginForm.value)
      .subscribe(async data => {
          if (data.code === 0) {
            await this.authService.authSuccess(data);
            this.router.navigate(['/manage']);
          } else {
            this._snackBar.open(data.msg, '', {
              duration: 2000,
              verticalPosition: 'top',
            });
          }
        }
        , error => {
          console.error('error:', error);
          this._snackBar.open('服务器正忙...', '', {
            duration: 2000,
            verticalPosition: 'top',
          });
        }
      );
  }
}
