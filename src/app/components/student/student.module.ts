import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentWelcomeComponent } from './student-welcome/student-welcome.component';
import { QuizStartComponent } from './quiz-start/quiz-start.component';
import { QuizIntructionComponent } from './quiz-intruction/quiz-intruction.component';
import { DashboredComponent } from './dashbored/dashbored.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';


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
    StudentWelcomeComponent,
    QuizStartComponent,
    QuizIntructionComponent,
    DashboredComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    Material
  ],
  exports:[
    StudentWelcomeComponent,
    QuizStartComponent,
    QuizIntructionComponent,
    DashboredComponent

  ]
})
export class StudentModule { }
