import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectCategory } from 'src/app/models/project-category.model';
import { ProjectCategoryService } from 'src/app/services/project-category.service';

@Component({
  selector: 'app-project-category-edit',
  templateUrl: './project-category-edit.component.html',
  styleUrls: ['./project-category-edit.component.css']
})
export class ProjectCategoryEditComponent {
  projectCategoryForm: FormGroup;
  projectCategorySubscription$: Subscription;
  projectCategory: ProjectCategory;

  projectCategories: ProjectCategory[] = [];

  constructor(private fb: FormBuilder,
              private projectCategoryService: ProjectCategoryService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.projectCategoryService.getProjectCategory(id).subscribe(
      (response: ProjectCategory) => {
        this.projectCategory = response;
        this.initForm(this.projectCategory);
      }
    );
  }

  initForm(projectCategory: ProjectCategory) {
    this.projectCategoryForm = this.fb.group({
      name: [projectCategory.name, Validators.required],
      description: [projectCategory.description, Validators.required],
    });
  }

  submitForm() {
    const formValue = this.projectCategoryForm.value;
    this.projectCategory.name = formValue['name'];
    this.projectCategory.description = formValue['description'];
    console.log(this.projectCategory);

    this.projectCategoryService.editProjectCategory(this.projectCategory.id ?? 0, this.projectCategory).subscribe(
      (response: ProjectCategory) => {
        this.router.navigate([`/projects/${response.id}`])
      },
      (error) => {
        console.error(`An error occured: ${error.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.projectCategorySubscription$.unsubscribe();
  }
}
