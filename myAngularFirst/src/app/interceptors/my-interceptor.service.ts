import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyInterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("Token");
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization','token')
    });
    return next.handle(modifiedReq).pipe(catchError(err => {
      if([401,403].includes(err.status)){
        this.router.navigate(['']);
      }
      const error = err.error?.message || err.status.Text;
      return throwError(() => error);
    }));
  }
} 
