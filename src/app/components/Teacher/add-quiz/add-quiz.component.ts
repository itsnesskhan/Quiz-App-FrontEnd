import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Quiz } from 'src/app/models/quiz';
import { CategoryService } from 'src/app/servies/category.service';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { QuizService } from 'src/app/servies/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  public quizModel = new Quiz(0,"","","",true, {cid:0,name:''})


  constructor(private _catService:CategoryService,
              private _quizService:QuizService,
              private _snack:MatSnackBar
              ) { }

  categories:Category[] =[
      ]

  ngOnInit(): void {
    this._catService.getCategories().subscribe({
      next:(data:Category[])=>{
        this.categories = data
      }
    })
  }
  submited= false

  public quizSubmit(form:NgForm){
    if(form.form.invalid){
      this.submited = true
      return
    }
    this._quizService.addQuiz(this.quizModel).subscribe({
      next:(data)=>{
        Swal.fire({
          title:'Success!',
          text:'Quiz Added Sucessfully!',
          icon:'success',
        })
        form.resetForm()
      
      },
      error:(error)=>{
        console.log(error)
        this._snack.open("category is required",'',{duration:2000})
      }
    })
  }

}
