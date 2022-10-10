import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboredComponent } from './dashbored/dashbored.component';
import { QuizIntructionComponent } from './quiz-intruction/quiz-intruction.component';
import { QuizStartComponent } from './quiz-start/quiz-start.component';
import { StudentWelcomeComponent } from './student-welcome/student-welcome.component';

const routes: Routes = [
  {
    path: 'student-dashbored',
     children: [
      {path:'',component:DashboredComponent},
      {path:':cid',component:StudentWelcomeComponent},
      {path:'instruction/:qid',component:QuizIntructionComponent},
      {path:'quiz-start/:qid/:title',component:QuizStartComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
