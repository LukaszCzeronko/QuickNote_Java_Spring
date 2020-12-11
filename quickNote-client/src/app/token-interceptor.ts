import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {AuthorizationService} from './auth/authorization.service';
import{ catchError,switchMap} from 'rxjs/operators';
import {LoginResponse} from './model/loginResponse';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
     constructor(public authService: AuthorizationService) { }
     intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const jwtToken = this.authService.getJwtToken();
        return next.handle(this.addToken(req, jwtToken));

    }

// setHeaders
     addToken(req: HttpRequest<any>, jwtToken:any){
         return req.clone({
            headers: req.headers.set('Authorization',
             jwtToken)
         });
     }
}