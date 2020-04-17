import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements AuthInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();
    let r = req;
    if (authToken) {
      r = req.clone({
        headers: req.headers.set('token', authToken)
      });
    }
    return next.handle(r).pipe(
      tap(event => {
        if (event instanceof HttpResponse && event.body) {
          if (event.body.code === 501 || event.body.code === 502) {
            this.authService.removeAuthToken();
          }
        }
      })
    );
  }
}
