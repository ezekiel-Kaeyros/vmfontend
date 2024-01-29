import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoryCreateComponent } from './course-category-create.component';

describe('CourseCategoryCreateComponent', () => {
  let component: CourseCategoryCreateComponent;
  let fixture: ComponentFixture<CourseCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCategoryCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
