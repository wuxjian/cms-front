import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient,
              private userService: UserService, private router: Router) {
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.http.post<any>('http://127.0.0.1:9000/login', this.loginForm.value)
      .subscribe(data => {
          console.log(data);
          if (data.code === 0) {
            this.userService.hasLogin = true;
            this.router.navigate(['/manage']);
          } else {
            this.userService.hasLogin = false;
          }
        }
        , error => console.error('error:', error)
      );
  }

}
