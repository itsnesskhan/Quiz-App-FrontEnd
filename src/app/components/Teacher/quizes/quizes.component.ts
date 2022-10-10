import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/servies/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css']
})
export class QuizesComponent implements OnInit {

  config:any;
  quizes:Quiz[] = []

  constructor(private _quizService:QuizService) { }

  ngOnInit(): void {
    this._quizService.getQuizes().subscribe({
      next:(data:Quiz[])=>{
        this.quizes = data
      }
    })

    this.config = {
      'itemsPerPage':3,
      'currentPage':1,
      'totalItem':this.quizes.length
    }
  }

  public PageChange(event:any){
    this.config.currentPage = event
  }

  public deleteQuiz(qid:number){
    Swal.fire({
      title:'warning',
      text:'are you sure, you want to delete quiz',
      icon:'warning',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this._quizService.deleteQuiz(qid).subscribe({
          next:(data:any)=>{
            this.quizes = this.quizes.filter(quiz=>quiz.qid!=qid)
            Swal.fire({
              title:'Success!',
              text:'Quiz deletee successfully!',
              icon:'success'
    
          })
          },
          error:(error)=>{
            console.log(error)
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong',
              icon: 'error',
              confirmButtonText: 'ok'
            })
          }
        })
      }
    })
  }

  

}
