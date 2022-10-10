import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/servies/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public qId = 0
  public title:string|null = null;
  public showAddButton = true;
  public qCount =0;
  public question:Question[] =[]
  constructor(private _route:ActivatedRoute,
              private _questionService:QuestionService, 
              ){  }

  ngOnInit(): void {
    this.qId = Number(this._route.snapshot.paramMap.get('qid'))
    this.title = this._route.snapshot.paramMap.get('title')
    this._questionService.getQuestionOfQuiz(this.qId).subscribe({
      next:(data:Question[])=>{
        this.question = data
         if(Number(data[0].quiz.numOfQuestion)== this.question.length){
          this.showAddButton= false
         }
         else{
          this.qCount = Number(data[0].quiz.numOfQuestion)- this.question.length
         }
      },
      error:(error)=>{
        Swal.fire({
          title:'Error',
          text:'Somthing went wrong',
          icon:"error"
        })
      }
    })

    this.config = {
      itemsPerPage:2,
      currentPage:1,
      totolItems:this.question.length,
    }
  }

  config:any;

  public pageChange(event:any){
    this.config.currentPage = event;
  }

  public deleteQuestion(qid:number){
    Swal.fire({
      title:'warning',
      text:'are you sure, you want to delete quiz',
      icon:'warning',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this._questionService.deleteQuestion(qid).subscribe({
          next:(data:any)=>{
            this.question = this.question.filter(q=>q.question_id!=qid)
            Swal.fire({
              title:'Success!',
              text:data.msg,
              icon:'success'
    
          })
          },
          error:(error:any)=>{
            console.log(error)
            Swal.fire({
              title: 'Error!',
              text: error.msg,
              icon: 'error',
              confirmButtonText: 'ok'
            })
          }
        })
      }
    })
  }

}
