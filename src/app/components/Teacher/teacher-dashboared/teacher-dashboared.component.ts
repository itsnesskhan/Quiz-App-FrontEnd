import { Component, OnInit } from '@angular/core';
import {  Quiz_Result } from 'src/app/models/quiz-result';
import { QuizService } from 'src/app/servies/quiz.service';

@Component({
  selector: 'app-teacher-dashboared',
  templateUrl: './teacher-dashboared.component.html',
  styleUrls: ['./teacher-dashboared.component.css']
})
export class TeacherDashBoredComponent implements OnInit {

  public quiz_result:Quiz_Result[] =[]
  config:any;

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.getQuizResults().subscribe({
      next:(data:Quiz_Result[])=>{
        this.quiz_result = data
      },
      error:(error)=>{
        console.log(error)
      }
    })

    
    
  }

  public pageChange(event:any){
    this.config.currentPage = event;
  }

}
