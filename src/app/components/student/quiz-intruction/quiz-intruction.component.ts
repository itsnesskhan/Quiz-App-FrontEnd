import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/servies/quiz.service';

@Component({
  selector: 'app-quiz-intruction',
  templateUrl: './quiz-intruction.component.html',
  styleUrls: ['./quiz-intruction.component.css']
})
export class QuizIntructionComponent implements OnInit {

  @Output() eventEmiter:EventEmitter<any> = new EventEmitter()

  qid=0
  quiz = new Quiz(0,'','','',true,{cid:0,name:''})

  constructor(private _quiz:QuizService,
              private _route:ActivatedRoute,
              private _snack:MatSnackBar
              ) { }

  ngOnInit(): void {
    this.qid = Number(this._route.snapshot.paramMap.get('qid'))
    this._quiz.getQuizById(this.qid).subscribe({
      next:(data:Quiz)=>{
        this.quiz = data
      },
      error:(error)=>{
        this._snack.open("Something went wrong")
        console.log(error)
      }
    })
  }

}
