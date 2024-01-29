import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoryDetailsComponent } from './course-category-details.component';

describe('CourseCategoryDetailsComponent', () => {
  let component: CourseCategoryDetailsComponent;
  let fixture: ComponentFixture<CourseCategoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCategoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
