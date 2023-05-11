import { environment } from './../../../environments/environment.development';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router:Router) { }


  register(userData: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'signup', userData)
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'signin', userData)
  }

  decodeToken() {
    let encode: any = localStorage.getItem('userToken');
    let decode: any = jwtDecode(encode);
    console.log(decode);
    localStorage.setItem('userData',JSON.stringify(decode));
    this.userProfile.next(decode);
  }


  logout(userData: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'signOut', userData)
  }

}
