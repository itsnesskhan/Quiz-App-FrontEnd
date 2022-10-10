import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/baseUrl';
import { User } from '../models/user';
import { catchError } from "rxjs";
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient,
              private _error:ErrorService) { }

  public addUser(user:User){
    return this.http.post(`${baseUrl}/student`,user).pipe(catchError(this._error.handleError));
  }

  public getAllUsers(){
    return this.http.get<User[]>(`${baseUrl}/student`)
  }

  public getUserById(uid:number){
    return this.http.get<User>(`${baseUrl}/student/${uid}`)
  }

  public updateUser(formData:FormData, uid:number){
    return this.http.put(`${baseUrl}/student/profile/${uid}`, formData);
  }

  public downloadUrl(imageName:string){
    return this.http.get(`${baseUrl}/student/profile/image/${imageName}`);
  }
  
}

