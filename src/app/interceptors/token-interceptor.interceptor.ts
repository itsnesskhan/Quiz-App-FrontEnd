import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../servies/login.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //adding jwt to headeer
    const token = this.loginService.getToken();

    if(token!=null){
     request = request.clone({
      setHeaders:{Authorization:`Bearer ${token}`}
     })
    }
    console.log(request.headers)
    return next.handle(request);
  }
}
