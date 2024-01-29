import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CourseCategory } from 'src/app/models/course-category.model';
import { Course } from 'src/app/models/course.model';
import { CategoryService } from 'src/app/services/category.service';
import { CourceService } from 'src/app/services/cource.service';
import { CourseCategoryService } from 'src/app/services/course-category.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent {

  courseForm: FormGroup;
  coursePreview$: Observable<Course>;
  course: Course;

  categories: CourseCategory[] = [];
  categorySubscription$: Subscription;

  constructor(private fb: FormBuilder,
              private courseService: CourceService,
              private categoryService: CourseCategoryService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryService.getAllCategorys();
    this.categorySubscription$ = this.categoryService.courseCategorySubject$.subscribe(
      (response: CourseCategory[]) => {
        console.log(response)
        this.categories = response;
      },
      (error) => {
        console.log('An error occured: ' + error);
      }
    );

    const id = +this.route.snapshot.params['id'];
    this.courseService.getCourse(id).subscribe(
      (response: Course) => {
        this.course = response;
        this.initForm(this.course);
      }
    );
    this.coursePreview$ = this.courseForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue
      }))
    );
  }

  initForm(course: Course) {
    this.courseForm = this.fb.group({
      title: [course.title, Validators.required],
      content: [course.content, Validators.required],
      category_id: [course.category_id],
      course_fees: [course.course_fees],
      location: [course.location],
      start_date: [course.start_date],
      end_date: [course.end_date],
      start_time: [course.start_time],
      end_time: [course.end_time],
      director: [course.director],
      code: [course.code]
    });
  }

  submitForm() {
    const formValue = this.courseForm.value;
    this.course.title = formValue['title'];
    this.course.content = formValue['content'];
    this.course.category_id = formValue['category_id'];
    this.course.course_fees = formValue['course_fees'];
    this.course.location = formValue['location'];
    this.course.start_date = formValue['start_date'];
    this.course.end_date = formValue['end_date'];
    this.course.start_time = formValue['start_time'];
    this.course.end_time = formValue['end_time'];
    this.course.director = formValue['director'];
    this.course.code = formValue['code'];
    console.log(this.course);

    this.courseService.editCourse(this.course.id ?? 0, this.course).subscribe(
      (response: Course) => {
        this.router.navigate([`/courses/${response.id}`])
      },
      (error) => {
        console.error(`An error occured: ${error.message}`);
      }
    );
  }

  get contentControl() {
    return this.courseForm.controls['content'] as FormControl;
  }
  
  get contendControl() {
    return this.courseForm.controls['content'] as FormControl;
  }

  ngOnDestroy(): void {
    this.categorySubscription$.unsubscribe();
  }

}
