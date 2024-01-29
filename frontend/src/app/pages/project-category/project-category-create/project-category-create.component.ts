import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectCategory } from 'src/app/models/project-category.model';
import { ProjectCategoryService } from 'src/app/services/project-category.service';

@Component({
  selector: 'app-project-category-create',
  templateUrl: './project-category-create.component.html',
  styleUrls: ['./project-category-create.component.css']
})
export class ProjectCategoryCreateComponent {
  projectCategoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectCategoryService: ProjectCategoryService,
    private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.projectCategoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ''
    });
  }

  submitForm() {
    const formValue = this.projectCategoryForm.value;
    const projectCategory: ProjectCategory = {
      name: formValue['name'],
      description: formValue['description']
    };
    console.log(projectCategory);
    this.projectCategoryService.createProjectCategory(projectCategory).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate([`/projectscategory/${response.id}`]);
      },
      (error) => {
        console.log(error);
        console.error('An occured: ' + error);
      }
    );
  }
}
