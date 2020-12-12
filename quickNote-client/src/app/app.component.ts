import { Component } from '@angular/core';
import {AuthorizationService} from './auth/authorization.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:AuthorizationService){}
  logout() {
    this.auth.logout();
  
  }
  title = 'quickNote-client';
}
