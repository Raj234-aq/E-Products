import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class AuthReqInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let user = JSON.parse(localStorage.getItem('userInfo') || '[]');
    if(user.length != 0){
      let _token = user.token;

      request = request.clone({
        setHeaders : {token : `${_token}`},
      });
    }
    return next.handle(request);
  }
}
