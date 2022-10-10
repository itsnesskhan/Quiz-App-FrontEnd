import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/servies/quiz.service';
import { QuizStartComponent } from '../quiz-start/quiz-start.component';

@Component({
  selector: 'app-student-welcome',
  templateUrl: './student-welcome.component.html',
  styleUrls: ['./student-welcome.component.css']
})
export class StudentWelcomeComponent implements OnInit {

  quizes:Quiz[] = []
  cid = 0
  constructor(private _quizService:QuizService,
    private _router:ActivatedRoute ) { }

  ngOnInit(): void {
    this._router.params.subscribe((params:any)=>{
      this.cid = params.cid;
      if (this.cid==0) {
       this._quizService.getActiveQuiz().subscribe({
        next:(data:any)=>{
          this.quizes = data
        },
        error:(error)=>{
          console.log(error)
        }
       })
      }
      else {
        this._quizService.getActiveQuizOfCatgory(this.cid).subscribe({
          next:(data)=>{
            this.quizes = data;
          },
          error:(error)=>{
            console.log(error)
          }
        })
      }
    })
  }


}
