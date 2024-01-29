import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { CourceService } from 'src/app/services/cource.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CategoryService } from 'src/app/services/category.service';
import { Observable, Subscription, map } from 'rxjs';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseCategory } from 'src/app/models/course-category.model';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit, OnDestroy {

  courseForm: FormGroup;
  showSpinner: boolean = false;
  coursePreview$: Observable<Course>;
  categories: CourseCategory[] = [];
  categorySubscription$: Subscription;

  constructor(private fb: FormBuilder,
              private courseService: CourceService,
              private categoryService: CourseCategoryService,
              private router: Router,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.categoryService.getAllCategorys();
    this.categorySubscription$ = this.categoryService.courseCategorySubject$.subscribe(
      (response: CourseCategory[]) => {
        this.categories = response;
      },
      (error) => {
        console.log('An error occured: ' + error);
      }
    );
    this.initForm();
      
    this.coursePreview$ = this.courseForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue
      }))
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  initForm() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category_id: null,
      course_fees: null,
      duration: null,
      location: null,
      start_date: null,
      end_date: null,
      start_time: null,
      end_time: null,
      director: null,
      code: null,
      days: null,
    });
  }

  submitForm() {
    const formValue = this.courseForm.value;

    console.log('formValue', formValue['category_id']);
    const course: Course = {
      title: formValue['title'],
      content: formValue['content'],
      category_id: parseInt(formValue['category_id'], 10),
      location: formValue['location'],
      course_fees: formValue['course_fees'],
      duration: formValue['duration'],
      start_date: formValue['start_date'],
      end_date: formValue['end_date'],
      start_time: formValue['start_time'],
      end_time: formValue['end_time'],
      lead: formValue['director'],
      code: formValue['code'],
      days: formValue['days'],
    };
    console.log(course);
    this.showSpinner = true;

    this.courseService.createCourse(course).subscribe(
      (response) => {
        console.log(response);
        this.showSpinner = false;

        this.openSnackBar('Kurs erstellt', 'Schliessen');
        this.router.navigate([`/courses/${response.id}`]);
      },
      (error) => {
        console.log(error);
        console.error('An occured: ' + error);
        this.openSnackBar('Fehler', 'Schliessen');
      }
    );
  }

  get contendControl() {
    return this.courseForm.controls['content'] as FormControl;
  }

  ngOnDestroy(): void {
    this.categorySubscription$.unsubscribe();
    console.log('hey');
  }

}
