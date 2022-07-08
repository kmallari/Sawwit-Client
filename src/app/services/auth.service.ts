import { Injectable, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}
  isLogin: boolean = false; // persisting
  
  getUserDetails() {
    return JSON.parse(this.cookieService.get('userData'));
  }

  setDataInCookies(variableName: string, data: any) {
    // instead of storing in localstorage, store in cookies !!
    this.cookieService.set(variableName, data);
  }

  getToken() {
    return this.cookieService.get('token');
  }

  clearStorage() {
    this.cookieService.deleteAll();
  }

  // getUserDetails() {
  //   if (localStorage.getItem('userData')) {
  //     return JSON.parse(localStorage.getItem('userData') || '{}');
  //   } else {
  //     return null;
  //   }
  // }

  // setDataInLocalStorage(variableName: string, data: any) {
  //   // instead of storing in localstorage, store in cookies !!
  //   localStorage.setItem(variableName, data);
  // }

  // getToken() {
  //   return localStorage.getItem('token');
  // }

  // clearStorage() {
  //   localStorage.clear();
  // }
}
