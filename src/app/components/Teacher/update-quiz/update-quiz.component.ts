import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router, RouterLinkActive } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Quiz } from 'src/app/models/quiz';
import { CategoryService } from 'src/app/servies/category.service';
import { QuizService } from 'src/app/servies/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  public qid = 0;
  public quizModel = new Quiz(0,'','','',true,{cid:0,name:''});
  public categories:Category[] = [];

  constructor(private _quizService:QuizService,
              private _cateService:CategoryService,
              private _routNav:Router,
              private _route:ActivatedRoute,
              ) { }
    
  ngOnInit(): void {
    this.qid = Number(this._route.snapshot.paramMap.get('id'))

    this._cateService.getCategories().subscribe({
      next:(data:Category[])=>{
        this.categories = data;
      }
    })

    this._quizService.getQuizById(this.qid).subscribe({
      next:(data:Quiz)=>{
        this.quizModel = data;
      },
      error:(error)=>{
        Swal.fire(
          'error',
          'Somthing went wrong',
          'error'
        )
        console.log(error)
      }
    })
  }

  public quizUpdate(){
      this._quizService.updateQuiz(this.quizModel, this.quizModel.qid).subscribe({
        next:(data:Quiz)=>{
          Swal.fire({
            text:'Quiz updated Successfully!',
            icon:'success'
          }).then(
            (result)=>{
              this._routNav.navigate(['/teacher/quizes'])
            }
          )
          console.log(data)
        },
        error:(error)=>{
          Swal.fire(
            {
              text:'Somthing went wrong',
              icon:'error'
            }
          )
           console.log(error)
        }
      })
  }

}
