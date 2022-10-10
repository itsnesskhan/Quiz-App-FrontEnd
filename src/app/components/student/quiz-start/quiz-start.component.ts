import { LocationStrategy } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { Quiz_Result } from 'src/app/models/quiz-result';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/servies/login.service';
import { QuestionService } from 'src/app/servies/question.service';
import { QuizService } from 'src/app/servies/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit, OnDestroy {
  qid: number = 0;
  title: string | null = ''
  question: Question[] = []
  config = {
    itemsPerPage: 0,
    currentPage: 0,
    totolItems: 0,
  }
  user:User= {
    id:0,
    name:{fname:'',lname:''},
    email:'',
    password:'',
    roles:[],
    profile:''
  }
  public quiz = new Quiz(0,"","","",true, {cid:0,name:''})
  timer = 0;
  LastPage = 0;
  isSubmited = false;
  totalMarks: number = 0;
  quiz_result = new Quiz_Result(0,0,0,0,this.user,this.quiz)
  // marksGot: number = 0;
  // attempted: number = 0;
  // correctAns: number = 0;
  marksPercent: number = 0;





  constructor(private _quiz: QuizService,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _locationSt: LocationStrategy,
  ) {
    this._quiz.quizStart.next(true)
    // always send notification from construtor to see instant changes

  }

  ngOnInit(): void {
    this.preventBackButton
    this.title = this._route.snapshot.paramMap.get('title')
    this.qid = Number(this._route.snapshot.paramMap.get('qid'))
    this.loadQuestion()
    this._quiz.submitQuiz.asObservable().subscribe(res => {
      if (!this.isSubmited) {
        this._quiz.quizStart.next(false)
        this.isSubmited = true;
        this.evalQuiz()
        this.myspinner()
      }
    })


  }

  public loadQuestion() {
    this._question.getQuestionOfQuiz(this.qid).subscribe({
      next: (question: Question[]) => {
        this.question = question
        console.log(this.question)
        this.config = {
          itemsPerPage: 3,
          currentPage: 1,
          totolItems: this.question.length,
        }
        this.timer = this.question.length * 5 * 60
        this._quiz.timer.next(this.timer)
        this.LastPage = Math.ceil(this.config.totolItems / this.config.itemsPerPage)


      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  ngOnDestroy(): void {
    this._quiz.quizStart.next(false)
  }

  public pageChange(event: any) {
    this.config.currentPage = event;
  }

  public preventBackButton() {
    history.pushState(null, '', location.href)
    this._locationSt.onPopState(() => {
      history.pushState(null, '', location.href)
    })
  }

  public isLastPage() {
    if (this.LastPage == this.config.currentPage) {
      return true
    }
    return false
  }



  public evalQuiz() {
    this.totalMarks = Number(this.question[0].quiz.maxMarks)
    let marksPerQues = Number(this.question[0].quiz.maxMarks) / Number(this.question[0].quiz.numOfQuestion)
    // this.question.forEach(ques => {
    //   if (ques.given_answer != null) {
    //     this.attempted++
    //   }
    //   if (ques.answer === ques.given_answer) {
    //     this.correctAns++
    //     this.marksGot += marksPerQues
    //   }
    // });
    this._quiz.saveQuizRult(this.question).subscribe({
      next:(data:Quiz_Result)=>{
        this.quiz_result = data
        console.log(this.quiz_result)
        this.marksPercent = (this.quiz_result.marksGot / this.totalMarks) * 100
        this.myspinner()
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  spinper: number = 0;
  public myspinner() {
    let t = window.setInterval(() => {
      if (this.spinper == this.marksPercent) {
        clearInterval(t)
      }
      else {
        this.spinper++
      }
    }, 5)
  }
  public onSubmitQuiz() {

    Swal.fire({
      title: 'warning',
      text: 'are you sure, you want to Submit Quiz',
      icon: 'info',
      confirmButtonText: 'Submit',
      showCancelButton: true
    }).then(res => {
      if (!this.isSubmited) {
        this._quiz.quizStart.next(false)
        this.isSubmited = true;
        this.evalQuiz()
        
      }
    })
  }



}
