import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
 
@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user ? user.token : null;

    request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    if (token) {
      request = request.clone({headers: request.headers.set('authorization', token)});
    }
    return next.handle(request);
 
  }
 
}