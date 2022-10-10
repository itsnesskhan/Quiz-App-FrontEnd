import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/servies/login.service';
import { UserserviceService } from 'src/app/servies/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  file:File = new File([""],"")


  user:User= {
    id:0,
    name:{fname:'',lname:''},
    email:'',
    password:'',
    profile:'',
    roles:[],
    profileUrl:''
  }

  constructor(private _login:LoginService,
              private _user:UserserviceService,
              private _router:Router
              ) {}

  ngOnInit(): void {
    this._login.getCurrentUser().subscribe({
      next:(data:any)=>{
        this.user= data;
        console.log(this.user)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  public onFileSelected(event:any){
        if(event.target.files){
         this.file=  event.target.files[0];
         
        }
  }

  public updateProfile(form:NgForm){
    const formdata = this.prepareFormData(this.user);
    this._user.updateUser(formdata, this.user.id).subscribe({
      next:(data:any)=>{
        console.log(data)
        Swal.fire({
          text:'Profile updated Successfully!',
          icon:'success'
        }).then(
          (result)=>{
            this._login.loginStatus.next(true)
            this._router.navigate(['profile'])
          }
        )
      },
      error:(error)=>{
        console.log(error)
        Swal.fire(
          {
            text:'Somthing went wrong',
            icon:'error'
          }
        )
      }
    })
     
  }
  
  public prepareFormData(user:User):FormData{
   const formdata =  new FormData();
   formdata.append(
    'user', new Blob([JSON.stringify(user)], {type:'application/json'})
   )
    formdata.append(
      'profile',this.file
    )
   
   return formdata;
  }

}
