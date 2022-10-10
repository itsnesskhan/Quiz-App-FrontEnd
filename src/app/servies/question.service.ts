import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper/baseUrl';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _httpClient:HttpClient) { }

  public addQuestion(question:Question){
    return this._httpClient.post<Question>(`${baseUrl}/question`, question )
  }

  public getQuestionOfQuiz(qid:number){
    return this._httpClient.get<Question[]>(`${baseUrl}/question/quiz/${qid}`)
  }

  public getQuestionById(qid:number){
    return this._httpClient.get<Question>(`${baseUrl}/question/${qid}`)
  }

  public updateQuestion(question:Question){
    return this._httpClient.put<Question>(`${baseUrl}/question/`, question)
  }

  public deleteQuestion(qid:number){
    return this._httpClient.delete(`${baseUrl}/question/${qid}`)
  }
}
