import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

import { UserserviceService } from 'src/app/servies/userservice.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserserviceService,private router:Router) { }

  public user:User = {
    id:0,
    name:{fname:'',lname:''},
    email:'',
    password:'',
    roles:[],
    profile:''
  }

  error =''

  ngOnInit(): void {}
  formSubmit(){
    this.userService.addUser(this.user).subscribe(
      {
       next: (user:any)=>{
          this.router.navigate(['login'])
       },
       error: (error)=>{
          this.error = error
       }
      })
  }





  

}
