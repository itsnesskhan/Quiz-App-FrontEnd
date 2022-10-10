import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { LoginService } from './servies/login.service';
import { Router } from '@angular/router';
import { CategoryService } from './servies/category.service';
import { Category } from './models/category';
import { QuizService } from './servies/quiz.service';
import { UserserviceService } from './servies/userservice.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Quiz_App';
  quizStart:boolean = false;

  
  @ViewChild(MatSidenav) sidenav!: MatSidenav

  givenSeconds:number = 0;
  totalTime:number=0;
  category:Category[] =[]
  isLoggedIn = false
  user:User = this.loginService.getUser();
  Role:String|null= this.loginService.getUserRole();
  

  constructor(private observer: BreakpointObserver,
              private loginService: LoginService,
              private router: Router,
              private _catService:CategoryService,
              private _quiz:QuizService,
              private _user:UserserviceService
              )
              { 
                this._quiz.quizStart.subscribe(res=>{
                this.quizStart = res
                })
                this._quiz.timer.subscribe(res=>{
                  this.givenSeconds = res
                  this.totalTime = res
                  this.startTime()
                  
                })

                this.loginService.loginStatus.asObservable().subscribe((data) => {
                  this.isLoggedIn = this.loginService.isLoggedIn()
                  this._user.getUserById(this.loginService.getUser().id).subscribe({
                    next:(data)=>{
                      this.user = data
                    },
                    error:(error)=>{
                      console.log(error)
                    }
                  });
                  this.Role = this.loginService.getUserRole();
          
              })  
              }

  logoutUser() {
    this.loginService.logOutUser();
    this.loginService.loginStatus.next(false)
    this.router.navigate(['login'])
  }

  formateTime(){
    let hours=   Math.floor(this.givenSeconds/3600);
    let minutes = Math.floor((this.givenSeconds-(hours*3600))/60)
    let seconds = this.givenSeconds- (hours*3600)-(minutes*60)
 
    return `${hours} Hr: ${minutes} Min: ${seconds} Sec `
   }

  ngOnInit(): void {

    this.isLoggedIn = this.loginService.isLoggedIn()
    this._user.getUserById(this.loginService.getUser().id).subscribe({
      next:(data)=>{
        this.user = data
      },
      error:(error)=>{
        console.log(error)
      }
    });
    
    this._catService.getCategories().subscribe({
      next:(data:Category[])=>{
        this.category = data
      },
      error:(error)=>{
        alert("Error loding quizes from server")
      }
    })
    
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }
      else {
        this.sidenav.mode = 'side';
        this.sidenav.open()
      }     
    });
  }

  public startTime(){
   let t= window.setInterval(()=>{
      if(this.givenSeconds<=0){
        this._quiz.submitQuiz.next(true)
        this._quiz.quizStart.next(false)
          clearInterval(t)
      }
      else{
        this.givenSeconds--;
      }
    },1000)
  }


  

  


}
