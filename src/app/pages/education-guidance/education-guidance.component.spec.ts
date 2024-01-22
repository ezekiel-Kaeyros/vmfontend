import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationGuidanceComponent } from './education-guidance.component';

describe('EducationGuidanceComponent', () => {
  let component: EducationGuidanceComponent;
  let fixture: ComponentFixture<EducationGuidanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationGuidanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationGuidanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
