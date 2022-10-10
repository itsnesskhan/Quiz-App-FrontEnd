import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/servies/login.service';
import { UserserviceService } from 'src/app/servies/userservice.service';

@Component({
  selector: 'app-admin-dashbored',
  templateUrl: './admin-dashbored.component.html',
  styleUrls: ['./admin-dashbored.component.css']
})
export class AdminDashboredComponent implements OnInit {

  config:any;
  error:any;
  users:User[] =[]


  constructor(private _user:UserserviceService
              ) { }

  ngOnInit(): void {

    this.getAllUsers()

    this.config = {
      itemsPerPage:8,
      currentPage:1,
      totolItems:0
    }

  }

  public getAllUsers(){
    this._user.getAllUsers().subscribe({
      next:(data)=>{
        this.users = data;
      },
      error:(error)=>{
        this.error = error;
      }
    })
  }

  public pageChange(event:any){
    this.config.currentPage = event;
  }

}
