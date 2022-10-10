import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/servies/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-categroy',
  templateUrl: './update-categroy.component.html',
  styleUrls: ['./update-categroy.component.css']
})
export class UpdateCategroyComponent implements OnInit {
  
  cid = 0;
  public catModel = new Category(0,'')

  constructor(private _catService:CategoryService,
              private _route:ActivatedRoute,
              private _router:Router
              ) { }

  ngOnInit(): void {
    this.cid =  Number(this._route.snapshot.paramMap.get('cid'))
    this._catService.getCategoryById(this.cid).subscribe({
      next:(data:Category)=>{
        this.catModel = data
      },
      error:(error)=>{
        console.log(error)
        Swal.fire("error","Something went wrong")
      }
    })
  }

  public catUpdate(){
    this._catService.updateCategory(this.catModel, this.catModel.cid).subscribe({
      next:(data:any)=>{
        Swal.fire(
        {
          title:'success',
          text:'Category Updated Sucessfully',
          icon:'success'
        }).then(
          ()=>{
            this._router.navigate(['/teacher/categories'])
          }
        )
      },
      error:(error)=>{
        console.log("something went wrong")
      }
    })
  }

}
