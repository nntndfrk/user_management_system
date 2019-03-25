import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor
  implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth_token');
    const newReq = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
    return next.handle(newReq).pipe(
      tap(
        ev => {
          if (ev instanceof HttpResponse) {
            console.log(ev); // логирование запросов
          }
        },
        err => console.error(err) // логирование ошибок
      )
    );
  }
}
