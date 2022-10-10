import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/baseUrl';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient:HttpClient) { }

  public addCategory(category:Category){
    return this._httpClient.post<Category>(`${baseUrl}/categories`,category);
  }

  public getCategories(){
    return this._httpClient.get<Category[]>(`${baseUrl}/categories`);
  }

  public getCategoryById(cid:number){
    return this._httpClient.get<Category>(`${baseUrl}/categories/${cid}`)
  }

  public deleteCategory(cid:number){
    return this._httpClient.delete(`${baseUrl}/categories/${cid}`);
  }

  public updateCategory(category:Category, cid:number){
    return this._httpClient.put(`${baseUrl}/categories/${cid}`, category)
  }
}
