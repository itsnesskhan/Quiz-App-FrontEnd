import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { loginData } from 'src/app/models/login';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/servies/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authLogin:loginData ={
    username:"",
    password:""
  }

  error =''
  hidePass= true
  constructor(private loginService:LoginService,
              private router:Router,
              private _snack:MatSnackBar,
              ) { }

  ngOnInit(): void {}

  loginSubmit(){
    this.loginService.genToken(this.authLogin).subscribe(
      {
        next: (data:any)=> {
          console.log("success");
          this.loginService.loginUser(data.taken)
          this.loginService.getCurrentUser().subscribe(
            {
              next:(user:any)=>{
                console.log(user)
                this.loginService.setUser(user)
                console.log(this.loginService.getUserRole())
                if(this.loginService.getUserRole() =="ADMIN"){
                  console.log("insdie if")
                  this.router.navigate(['teacher'])
                  this.loginService.loginStatus.next(true)
                }
                else if(this.loginService.getUserRole()=="STUDENT"){
                  this.router.navigate(['student-dashbored/'])
                  this.loginService.loginStatus.next(true)
                }
                else{
                  this.loginService.logOutUser();
                }
              },
              error:(error)=>{
                console.log(error)
                this.error = error
              }
            }
          )
        
        },
        error:(error)=> {
          console.log(error)
          this.error = error
        },
      }
    )
  }

}
