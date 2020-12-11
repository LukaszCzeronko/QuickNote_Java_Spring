import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SignupRequest} from 'src/app/model/signupRequest';
import {LoginRequest} from 'src/app/model/loginRequest';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {LoginResponse} from 'src/app/model/loginResponse';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
private baseUrl='http://localhost:8080/quick-note/api/auth';
  constructor(private http:HttpClient,private localStorage:LocalStorageService) { }

  signup(signupData:SignupRequest):Observable<any>{
    return this.http.post(`${this.baseUrl}/signup`,signupData,{responseType: "text"});
  }
  login(loginData:LoginRequest): Observable<boolean>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`,loginData).pipe(map(data=>{
      this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
      return true;
   }));
  }
  
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
}
