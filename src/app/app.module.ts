import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PublicUrlGuard } from './guards/public-url.guard';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './components/login/login.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import {  MatMenuModule  } from "@angular/material/menu";
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { StudentModule } from './components/student/student.module';
import { CategoriesComponent } from './components/Teacher/categories/categories.component';
import { AddCategoryComponent } from './components/Teacher/add-category/add-category.component';
import { QuizesComponent } from './components/Teacher/quizes/quizes.component';
import { AddQuizComponent } from './components/Teacher/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './components/Teacher/update-quiz/update-quiz.component';
import { UpdateCategroyComponent } from './components/Teacher/update-categroy/update-categroy.component';
import { QuestionsComponent } from './components/Teacher/questions/questions.component';
import { AddQuestionComponent } from './components/Teacher/add-question/add-question.component';
import { UpdateQuestionComponent } from './components/Teacher/update-question/update-question.component';
import { TeacherDashBoredComponent } from './components/Teacher/teacher-dashboared/teacher-dashboared.component';
import { AdminDashboredComponent } from './components/admin/admin-dashbored/admin-dashbored.component';





const Material = [
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatRadioModule,
  MatDividerModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatCardModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    TeacherDashBoredComponent,
    CategoriesComponent,
    AddCategoryComponent,
    QuizesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    UpdateCategroyComponent,
    QuestionsComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    UpdateProfileComponent,
    AdminDashboredComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxUiLoaderModule,
    StudentModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    Material
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorInterceptor,
    multi: true
  }, AuthGuard, PublicUrlGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
