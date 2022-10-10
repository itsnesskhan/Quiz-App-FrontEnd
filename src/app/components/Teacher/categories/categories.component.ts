import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/servies/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService:CategoryService) { }

  categories:Category[]=[
    
  ]

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next:(data:Category[])=>{
        this.categories = data;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  public deleteCat(cid:any){
    Swal.fire({
      title:'Warning',
      text:'if you delete this category, quizes within this category will also be deleted?',
      icon:'warning',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then(
      (result)=>{
        if (result.isConfirmed) {
          this.categoryService.deleteCategory(cid).subscribe({
            next:(data:any)=>{
              this.categories = this.categories.filter(cat=>cat.cid!=cid)
              Swal.fire("Success",data.msg,"success")
            },
            error:(error)=>{
              console.log(error)
              Swal.fire("Error",error.statusText,"error")
            }
          })
        }
      }
    )

  }



}
