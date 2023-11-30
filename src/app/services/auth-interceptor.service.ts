import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.token;
    let reqChange = req;

    if (token) {
      const moddifiedReq = req.clone({
        params: new HttpParams().set('auth', token),
      });

      reqChange = moddifiedReq;
    }

    return next.handle(reqChange);
  }
}
