import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import {SignupRequest} from 'src/app/model/signupRequest';
import {LoginRequest} from 'src/app/model/loginRequest';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {LoginResponse} from 'src/app/model/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  @Output() loggedIn: EventEmitter<boolean>= new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  private baseUrl='http://localhost:8080/quick-note/api/auth';
  constructor(private http:HttpClient,private localStorage:LocalStorageService) { }

  signup(signupData:SignupRequest):Observable<any>{
    return this.http.post(`${this.baseUrl}/signup`,signupData,{responseType: "text"});
  }
  login(loginData:LoginRequest): Observable<boolean>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`,loginData).pipe(map(data=>{
      this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.loggedIn.emit(true);
        this.username.emit(data.username);
      return true;
   }));
  }
  
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
  logout() {
    this.http.get('http://localhost:8080/quick-note/api/auth/logout')
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
      this.loggedIn.emit(false);
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
  }
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
  getUserName() {
    return this.localStorage.retrieve('username');
  }
}
