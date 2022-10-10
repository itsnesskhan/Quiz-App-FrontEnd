import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Option } from 'src/app/models/option';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { QuestionService } from 'src/app/servies/question.service';
import { QuizService } from 'src/app/servies/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public isSubmited = false;
  public quizId =0;
  public options:Option[] = [{option_id:0,content:''},{option_id:0,content:''},{option_id:0,content:''},{option_id:0,content:''}]
  public questionModel = new Question(0,'',this.options,'',{qid:0,title:'',numOfQuestion:'',maxMarks:'',active:true,category:{cid:0,name:''}},'')
  public quizTitle:string |null = ''
  public canAddQuestion = false;

  constructor(private _quizService:QuizService,
              private _questionService:QuestionService,
              private _route:ActivatedRoute,
              private _router:Router) { }

  ngOnInit(): void {
    this.quizId = Number(this._route.snapshot.paramMap.get('qid'))
    this.quizTitle = this._route.snapshot.paramMap.get('title')
    this.questionModel.quiz.qid = this.quizId
  }

  public addQuestion(qesform:NgForm){
    if (qesform.form.invalid) {
      this.isSubmited = true
      return
    }
    this._questionService.addQuestion(this.questionModel).subscribe({
      next:(question:Question)=>{
        this.isSubmited = false;
        Swal.fire({
          title:'Sucsess!',
          text:'Question added Successfully!',
          icon:'success'
        })
        this._router.navigate(['/teacher/quiz/questions/'+this.quizId+'/'+this.quizTitle])

       
      },
      error:(error)=>{
        Swal.fire({
          title:"Error",
          text:error.msg,
          icon:"error"
        })
        console.log(error)
      }
    })
  }

}
