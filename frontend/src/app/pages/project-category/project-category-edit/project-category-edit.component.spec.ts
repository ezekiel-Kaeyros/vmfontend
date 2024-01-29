import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCategoryEditComponent } from './project-category-edit.component';

describe('ProjectCategoryEditComponent', () => {
  let component: ProjectCategoryEditComponent;
  let fixture: ComponentFixture<ProjectCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCategoryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
