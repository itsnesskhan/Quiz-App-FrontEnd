import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizIntructionComponent } from './quiz-intruction.component';

describe('QuizIntructionComponent', () => {
  let component: QuizIntructionComponent;
  let fixture: ComponentFixture<QuizIntructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizIntructionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizIntructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
