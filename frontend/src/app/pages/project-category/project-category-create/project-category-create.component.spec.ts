import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCategoryCreateComponent } from './project-category-create.component';

describe('ProjectCategoryCreateComponent', () => {
  let component: ProjectCategoryCreateComponent;
  let fixture: ComponentFixture<ProjectCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCategoryCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
