import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategroyComponent } from './update-categroy.component';

describe('UpdateCategroyComponent', () => {
  let component: UpdateCategroyComponent;
  let fixture: ComponentFixture<UpdateCategroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCategroyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
