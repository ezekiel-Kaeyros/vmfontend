import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCategory } from 'src/app/models/course-category.model';
import { CourseCategoryService } from 'src/app/services/course-category.service';

@Component({
  selector: 'app-course-category-details',
  templateUrl: './course-category-details.component.html',
  styleUrls: ['./course-category-details.component.css']
})
export class CourseCategoryDetailsComponent {
  category: CourseCategory;

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private courseCategoryService: CourseCategoryService,
              ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.courseCategoryService.getCourseCategory(id).subscribe(
      (response: CourseCategory) => {
        console.log(response)
        this.category = response;
      }
    );
  }

  deleteCourse(category: CourseCategory) {
    this.courseCategoryService.courseCategories = this.courseCategoryService.courseCategories.filter(x => x.id !== category.id);
    this.courseCategoryService.emitCourseCategorySubject();
    this.router.navigate(['/course-category/list']);
  }
}
