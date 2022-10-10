import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component'
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { PublicUrlGuard } from './guards/public-url.guard';
import { LoginComponent } from './components/login/login.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { AddCategoryComponent } from './components/Teacher/add-category/add-category.component';
import { AddQuestionComponent } from './components/Teacher/add-question/add-question.component';
import { AddQuizComponent } from './components/Teacher/add-quiz/add-quiz.component';
import { CategoriesComponent } from './components/Teacher/categories/categories.component';
import { QuestionsComponent } from './components/Teacher/questions/questions.component';
import { QuizesComponent } from './components/Teacher/quizes/quizes.component';
import { UpdateCategroyComponent } from './components/Teacher/update-categroy/update-categroy.component';
import { UpdateQuizComponent } from './components/Teacher/update-quiz/update-quiz.component';
import { TeacherDashBoredComponent } from './components/Teacher/teacher-dashboared/teacher-dashboared.component';
import { UpdateQuestionComponent } from './components/Teacher/update-question/update-question.component';
import { AdminDashboredComponent } from './components/admin/admin-dashbored/admin-dashbored.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [PublicUrlGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [PublicUrlGuard] },
  { path: '', component: HomeComponent, canActivate:[PublicUrlGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/update', component: UpdateProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'teacher',
    children: [
      { path:'',component:TeacherDashBoredComponent},
      { path: 'categories', component: CategoriesComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'categories/update/:cid', component: UpdateCategroyComponent },
      { path: 'quizes', component: QuizesComponent },
      { path: 'add-quiz', component: AddQuizComponent },
      { path: 'quiz/update/:id', component: UpdateQuizComponent },
      { path: 'quiz/questions/:qid/:title', component: QuestionsComponent },
      { path: 'quiz/add-question/:qid/:title', component: AddQuestionComponent },
      { path: 'quiz/update-question/:qid', component: UpdateQuestionComponent },
    ],
    canActivate: [AuthGuard]
  },
  {path:'admin', component:AdminDashboredComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
