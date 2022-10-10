import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import baseUrl from '../helper/baseUrl';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';
import { Quiz_Result } from '../models/quiz-result';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _httpClient:HttpClient) { }

  quizStart = new BehaviorSubject<boolean>(false)
  timer = new Subject<number>();
  submitQuiz = new Subject<boolean>();

  public addQuiz(quiz:Quiz){
    return this._httpClient.post<Quiz>(`${baseUrl}/quiz`, quiz)
  }

  public getQuizes(){
    return this._httpClient.get<Quiz[]>(`${baseUrl}/quiz`)
  } 

  public getQuizById(qid:number){
    return this._httpClient.get<Quiz>(`${baseUrl}/quiz/${qid}`)
  }

  public updateQuiz(quiz:Quiz, quizId:number){
    return this._httpClient.put<Quiz>(`${baseUrl}/quiz/${quizId}`, quiz)
  }

  public deleteQuiz(quizId:number){
    return this._httpClient.delete(`${baseUrl}/quiz/${quizId}`)
  }

  public getActiveQuiz(){
    return this._httpClient.get<Quiz[]>(`${baseUrl}/quiz/active`);
  }

  public saveQuizRult(questions:Question[]){
    return this._httpClient.post<Quiz_Result>(`${baseUrl}/quiz/result`,questions)
  }

  public getQuizResults(){
    return this._httpClient.get<Quiz_Result[]>(`${baseUrl}/quiz/students-result`)
  }

  public getActiveQuizOfCatgory(cid:number){
    return this._httpClient.get<Quiz[]>(`${baseUrl}/quiz/category/${cid}`);
  }
}
