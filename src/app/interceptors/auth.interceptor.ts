import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements AuthInterceptor {

  constructor(private authService: AuthService) {
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
    return next.handle(r);
  }
}
