import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { CourceService } from 'src/app/services/cource.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit, OnDestroy {

  courseForm: FormGroup;
  categories: Category[] = [];
  categorySubscription$: Subscription;

  constructor(private fb: FormBuilder,
              private courseService: CourceService,
              private categoryService: CategoryService,
              private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getAllCategorys();
    this.categorySubscription$ = this.categoryService.categorySubject$.subscribe(
      (response: Category[]) => {
        this.categories = response;
      },
      (error) => {
        console.log('An error occured: ' + error);
      }
    );
      this.initForm();
  }

  initForm() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      start_date: [],
      end_date: [],
      course_fees: [],
      link: [''],
      author: [''],
      category: ['']
    });
  }

  submitForm() {
    const formValue = this.courseForm.value;
    const course: Course = {
      title: formValue['title'],
      description: formValue['description'],
      start_date: formValue['start_date'],
      end_date: formValue['end_date'],
      course_fees: formValue['course_fees'],
      link: formValue['link'],
      author: formValue['author'],
      category: formValue['category']
    };
    console.log(course);
    this.courseService.createCourse(course).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate([`/courses/${response.id}`]);
      },
      (error) => {
        console.log(error);
        console.error('An occured: ' + error);
      }
    );
  }

  get descriptionControl() {
    return this.courseForm.controls['description'] as FormControl;
  }

  ngOnDestroy(): void {
    this.categorySubscription$.unsubscribe();
  }

}
