import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherDashBoredComponent } from './teacher-dashboared.component';


describe('AdminDashboaredComponent', () => {
  let component: TeacherDashBoredComponent;
  let fixture: ComponentFixture<TeacherDashBoredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDashBoredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDashBoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
