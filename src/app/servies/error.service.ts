import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  public handleError(error:HttpErrorResponse){
    let error_msg = ''
    if(error.error.msg){
      error_msg = error.error.msg
    }
    else{
      error_msg = "there is some unknown error, please try again!"
    }

    return throwError(()=>(error_msg)) 
  }
}
