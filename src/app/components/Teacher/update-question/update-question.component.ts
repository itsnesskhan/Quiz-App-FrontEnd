import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Option } from 'src/app/models/option';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/servies/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public isSubmited = false;
  public qid = 0;
  public options: Option[] = [{ option_id: 0, content: '' }, { option_id: 0, content: '' }, { option_id: 0, content: '' }, { option_id: 0, content: '' }]
  public questionModel = new Question(0, '', this.options, '', { qid: 0, title: '', numOfQuestion: '', maxMarks: '', active: true, category: { cid: 0, name: '' } }, '')

  constructor(private _ques: QuestionService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.qid = Number(this._route.snapshot.paramMap.get('qid'))
    this._ques.getQuestionById(this.qid).subscribe({
      next: (data: Question) => {
        this.questionModel = data
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  public updateQuestion(quesform: NgForm) {
    if (quesform.form.invalid) {
      this.isSubmited = true
      return
    }
    this._ques.updateQuestion(this.questionModel).subscribe({
      next: (data: Question) => {
        Swal.fire({
          title: 'Sucsess!',
          text: 'Question Updated Successfully!',
          icon: 'success'
        }).then(()=>{
          this._router.navigate(['/teacher/quiz/questions/'+this.questionModel.quiz.qid+'/'+this.questionModel.quiz.title])
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
