import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {SpinnerService} from './spinner.service';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.showSpinner();
    const token = localStorage.getItem('auth_token');
    const newReq = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
    return next.handle(newReq).pipe(
      delay(100),
      tap(
        ev => {
          if (ev instanceof HttpResponse) {
            this.spinnerService.hideSpinner();
          }
        },
        err => {
          if (err.status === 401) {
            this.spinnerService.hideSpinner();
            this.authService.logout();
          }
        }
      )
    );
  }
}
