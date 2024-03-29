import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoryEditComponent } from './course-category-edit.component';

describe('CourseCategoryEditComponent', () => {
  let component: CourseCategoryEditComponent;
  let fixture: ComponentFixture<CourseCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCategoryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
