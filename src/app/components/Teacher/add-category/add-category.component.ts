import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/servies/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService) { }

  isSubmited = false;
  categoryModel= new Category(0,'');

  ngOnInit(): void {
  }


  public catSubmit(catform:NgForm){
    if (catform.form.invalid) {
      this.isSubmited = true;
      return
    }
    this.categoryService.addCategory(this.categoryModel).subscribe(
      {
        next:(data:Category)=>{
          console.log(data)
        },
        error:(error)=>{
          console.log(error)
        }
      }
    )
  }

}
