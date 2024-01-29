import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseCategory } from 'src/app/models/course-category.model';
import { CourseCategoryService } from 'src/app/services/course-category.service';

@Component({
  selector: 'app-course-category-edit',
  templateUrl: './course-category-edit.component.html',
  styleUrls: ['./course-category-edit.component.css']
})
export class CourseCategoryEditComponent {
  courseCategoryForm: FormGroup;
  courseCategorySubscription$: Subscription;
  courseCategory: CourseCategory;

  courseCategories: CourseCategory[] = [];

  constructor(private fb: FormBuilder,
              private courseCategoryService: CourseCategoryService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.courseCategoryService.getCourseCategory(id).subscribe(
      (response: CourseCategory) => {
        this.courseCategory = response;
        this.initForm(this.courseCategory);
      }
    );
  }

  initForm(courseCategory: CourseCategory) {
    this.courseCategoryForm = this.fb.group({
      name: [courseCategory.name, Validators.required],
      description: [courseCategory.description, Validators.required],
    });
  }

  submitForm() {
    const formValue = this.courseCategoryForm.value;
    this.courseCategory.name = formValue['name'];
    this.courseCategory.description = formValue['description'];
    console.log(this.courseCategory);

    this.courseCategoryService.editCourseCategory(this.courseCategory.id ?? 0, this.courseCategory).subscribe(
      (response: CourseCategory) => {
        this.router.navigate([`/courses/${response.id}`])
      },
      (error) => {
        console.error(`An error occured: ${error.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.courseCategorySubscription$.unsubscribe();
  }

}
