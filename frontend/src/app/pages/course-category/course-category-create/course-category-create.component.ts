import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseCategory } from 'src/app/models/course-category.model';
import { CourseCategoryService } from 'src/app/services/course-category.service';

@Component({
  selector: 'app-course-category-create',
  templateUrl: './course-category-create.component.html',
  styleUrls: ['./course-category-create.component.css']
})
export class CourseCategoryCreateComponent implements OnInit {
  courseCategoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseCategoryService: CourseCategoryService,
    private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.courseCategoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ''
    });
  }

  submitForm() {
    const formValue = this.courseCategoryForm.value;
    const courseCategory: CourseCategory = {
      name: formValue['name'],
      description: formValue['description']
    };
    console.log(courseCategory);
    this.courseCategoryService.createCourseCategory(courseCategory).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate([`/course-category/${response.id}`]);
      },
      (error) => {
        console.log(error);
        console.error('An occured: ' + error);
      }
    );
  }
}
