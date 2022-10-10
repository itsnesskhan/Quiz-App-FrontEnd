import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from '../helper/baseUrl';
import { loginData } from '../models/login';
import {User} from '../models/user';
import { catchError } from "rxjs";
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,
              private _error:ErrorService
              ) { }

  public loginStatus = new Subject<boolean>();

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/student/current-user`)
  }

  public genToken(loginCrediatials:loginData){
      return this.http.post(`${baseUrl}/login`, loginCrediatials).pipe(catchError(this._error.handleError))
  }

  public loginUser(token:string){
    localStorage.setItem('token',token);
    return true
  }

  public logOutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true
  }

  public isLoggedIn(){
    let token = localStorage.getItem('token');
    if(token == null || token == undefined || token == ''){
      return false;
    }
    else{
      return true;
    }
  }

  public getToken(){
    return localStorage.getItem('token')
  }

  public setUser(user:User){
    return localStorage.setItem('user', JSON.stringify(user))
  }

  public getUser(){
    let userStr = localStorage.getItem('user')
    if(userStr!=null){
      return JSON.parse(userStr)
    }
    else{
      this.logOutUser()
      return null
    }
  }

  public getUserRole(){
    let roles:String[] =[];
    let user=  this.getUser()
    if (user==null) {
      return null;
    }
    // user.authorities.forEach((element:String) => {
    //   roles.push(element);
    // });
    // console.log(roles);
    return user.authorities[0].authority;
  }


}
