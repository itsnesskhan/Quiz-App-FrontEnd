import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/servies/login.service';
import { UserserviceService } from 'src/app/servies/userservice.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private loginService:LoginService,
              private _user:UserserviceService
              ) { }

  user:User = {
    id:0,
    name:{fname:'',lname:''},
    email:'',
    password:'',
    profile:'',
    roles:[],
    profileUrl:'',
  }

  userRole:any;

  ngOnInit(): void {
    this._user.getUserById(this.loginService.getUser().id).subscribe({
      next:(data)=>{
        this.user = data
      },
      error:(error)=>{
        console.log("something went wrong")
      }
    })
    this.userRole = this.loginService.getUserRole()
  }

}
