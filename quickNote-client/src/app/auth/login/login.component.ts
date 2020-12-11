import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthorizationService} from '../authorization.service';
import {LoginRequest} from 'src/app/model/loginRequest';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm:FormGroup;
  loginRequest:LoginRequest;
  failed:boolean;
  constructor(private authService:AuthorizationService) { 
    this.loginRequest={
      username:'',
      password:''
    };
  }


  ngOnInit(): void {
    this.loginForm= new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }

login(){
  this.loginRequest.username=this.loginForm.get('username').value;
  this.loginRequest.password=this.loginForm.get('password').value;
  this.authService.login(this.loginRequest).subscribe(data=>{
    console.log('Login OK')
    this.failed=false;
  },error=>{
    this.failed=true;
    throwError(error);
  });
}
 
}
