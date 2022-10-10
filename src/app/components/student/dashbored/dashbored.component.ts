import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Quiz } from 'src/app/models/quiz';
import { CategoryService } from 'src/app/servies/category.service';
import { QuizService } from 'src/app/servies/quiz.service';
import { QuizStartComponent } from '../quiz-start/quiz-start.component';

@Component({
  selector: 'app-dashbored',
  templateUrl: './dashbored.component.html',
  styleUrls: ['./dashbored.component.css']
})
export class DashboredComponent implements OnInit {

categories:Category[] =[]
  

  constructor(  private _cat:CategoryService 
    ) { }

  ngOnInit(): void {
    this._cat.getCategories().subscribe({
      next:(data:Category[])=>{
        this.categories = data
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  

}
