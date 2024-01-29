import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { CourceService } from 'src/app/services/cource.service';
import { Router } from '@angular/router';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseCategory } from 'src/app/models/course-category.model';
import { Category } from 'src/app/models/category.model';




@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  showSpinner: boolean = true;
  categories: CourseCategory[] = [];

  courses: Course[] = [];
  courseSubscription$: Subscription;

  displayedColumns: string[] = ['position', 'title', 'content', 'category_id', 'course_fees', 'director', 'code', 'edit', 'delete'];
  dataSource: MatTableDataSource<Course>;
  categorySubscription$: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private courseService: CourceService,
    private router: Router,
    private categoryService: CourseCategoryService,
    ) {}

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

    this.courseService.getAllCourses();

    this.courseSubscription$ = this.courseService.courseSubject$.subscribe(
      (response: Course[]) => {
        console.log('Data of courses', response);
        this.courses = response;
        this.courses = [...this.courses.map(x => JSON.parse(JSON.stringify(x)))];
        this.courses = this.courses.map(course => {
          let subDes = course.content.replace(/<(.+?)>/g, '');
          if (subDes.length > 40) {
            subDes = subDes.substring(0, 40);
            subDes = subDes.substring(0, subDes.lastIndexOf(' '));
            subDes += '...';
          }
          course.content = subDes;

          let category = this.categories.find((cat) => cat.id === course.category_id);

          if(category) {
            course.category_name = category.name;
          }
          return course;
        });
        this.showSpinner = false;
    
        this.dataSource = new MatTableDataSource(this.courses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log('An error occured: ' + error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course.id ?? 0).subscribe(
      (response) => {
        console.log(response);
        this.courseService.emitCourseSubject();
        this.ngOnInit();
      }
    );
    // this.courseService.deleteCourse(course.id ?? 0).subscribe(
    //   (response) => {
    //     this.courseService.getAllCourses();
    //     this.router.navigate(['/courses']);
    //     console.log('Deleted successfully: ' + response);
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.courseSubscription$.unsubscribe();
  }

}
